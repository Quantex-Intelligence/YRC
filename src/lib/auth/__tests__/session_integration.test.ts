import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { Permissions, RoleCodes, RoleCode, DefaultRolePermissions } from "@/lib/rbac/permissions";
import crypto from "node:crypto";

describe("Session & RBAC Integration Test", () => {
  let testAdminUserId: string;
  let testBuyerUserId: string;
  let testTokenHash: string;

  beforeAll(async () => {
    // Ensure roles are seeded
    const adminRole = await prisma.role.upsert({
      where: { code: RoleCodes.SUPER_ADMIN },
      update: {},
      create: { code: RoleCodes.SUPER_ADMIN, name: "Super Admin", isSystem: true },
    });

    const buyerRole = await prisma.role.upsert({
      where: { code: RoleCodes.BUYER },
      update: {},
      create: { code: RoleCodes.BUYER, name: "Buyer", isSystem: true },
    });

    // Create test admin
    const adminUser = await prisma.user.upsert({
      where: { email: "test_admin@yrcglobal.com" },
      update: {},
      create: {
        email: "test_admin@yrcglobal.com",
        passwordHash: await hashPassword("TestAdmin123!"),
        status: "ACTIVE",
        userRoles: {
          create: { roleId: adminRole.id },
        },
      },
    });
    testAdminUserId = adminUser.id;

    // Create test buyer
    const buyerUser = await prisma.user.upsert({
      where: { email: "test_buyer@yrcglobal.com" },
      update: {},
      create: {
        email: "test_buyer@yrcglobal.com",
        passwordHash: await hashPassword("TestBuyer123!"),
        status: "ACTIVE",
        userRoles: {
          create: { roleId: buyerRole.id },
        },
      },
    });
    testBuyerUserId = buyerUser.id;
  });

  afterAll(async () => {
    // Cleanup test users
    await prisma.session.deleteMany({
      where: { userId: { in: [testAdminUserId, testBuyerUserId] } },
    });
    await prisma.user.deleteMany({
      where: { email: { in: ["test_admin@yrcglobal.com", "test_buyer@yrcglobal.com"] } },
    });
    await prisma.$disconnect();
  });

  it("should create a session record with SHA-256 token hash", async () => {
    const rawToken = crypto.randomBytes(32).toString("hex");
    testTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await prisma.session.create({
      data: {
        userId: testAdminUserId,
        tokenHash: testTokenHash,
        expiresAt,
      },
    });

    expect(session.id).toBeDefined();
    expect(session.userId).toBe(testAdminUserId);
    expect(session.tokenHash).toBe(testTokenHash);
  });

  it("should verify admin session possesses all permissions", async () => {
    const session = await prisma.session.findUnique({
      where: { tokenHash: testTokenHash },
      include: {
        user: {
          include: {
            userRoles: { include: { role: true } },
          },
        },
      },
    });

    expect(session).not.toBeNull();
    const roles = session!.user.userRoles.map((ur) => ur.role.code as RoleCode);
    expect(roles).toContain(RoleCodes.SUPER_ADMIN);

    const permissions = DefaultRolePermissions.SUPER_ADMIN;
    expect(permissions).toContain(Permissions.CATALOGUE_REVIEW);
    expect(permissions).toContain(Permissions.CATALOGUE_PUBLISH);
    expect(permissions).toContain(Permissions.USERS_MANAGE);
  });

  it("should verify buyer role does not possess catalogue review or publish", async () => {
    const buyerPermissions = DefaultRolePermissions.BUYER;
    expect(buyerPermissions).not.toContain(Permissions.CATALOGUE_REVIEW);
    expect(buyerPermissions).not.toContain(Permissions.CATALOGUE_PUBLISH);
    expect(buyerPermissions).toContain(Permissions.RFQ_CREATE);
  });

  it("should delete session and fail subsequent lookup", async () => {
    await prisma.session.delete({ where: { tokenHash: testTokenHash } });
    const session = await prisma.session.findUnique({ where: { tokenHash: testTokenHash } });
    expect(session).toBeNull();
  });
});
