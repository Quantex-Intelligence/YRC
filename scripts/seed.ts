import "dotenv/config";
import { prisma } from "../src/lib/db";
import { Permissions, RoleCodes, DefaultRolePermissions } from "../src/lib/rbac/permissions";
import { hashPassword } from "../src/lib/auth/password";

async function main() {
  console.log("Seeding YRC Global Phase 1 Foundation...");

  // 1. Seed Permissions
  console.log("Seeding granular permissions...");
  for (const [key, code] of Object.entries(Permissions)) {
    await prisma.permission.upsert({
      where: { code },
      update: {},
      create: {
        code,
        name: key.replace(/_/g, " "),
        category: code.split(".")[0],
        description: `Permission to perform ${code}`,
      },
    });
  }

  // 2. Seed Roles and assign permissions
  console.log("Seeding system and business roles...");
  for (const roleCode of Object.values(RoleCodes)) {
    const role = await prisma.role.upsert({
      where: { code: roleCode },
      update: {},
      create: {
        code: roleCode,
        name: roleCode.replace(/_/g, " "),
        description: `System role for ${roleCode}`,
        isSystem: true,
      },
    });

    // Assign permissions
    const allowedPerms = DefaultRolePermissions[roleCode] || [];
    for (const permCode of allowedPerms) {
      const perm = await prisma.permission.findUnique({ where: { code: permCode } });
      if (perm) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: perm.id,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: perm.id,
          },
        });
      }
    }
  }

  // 3. Seed Default Admin User
  console.log("Seeding default Super Admin user (admin@yrcglobal.com)...");
  const adminPasswordHash = await hashPassword("AdminPassword123!");
  const superAdminRole = await prisma.role.findUniqueOrThrow({
    where: { code: RoleCodes.SUPER_ADMIN },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@yrcglobal.com" },
    update: {},
    create: {
      email: "admin@yrcglobal.com",
      passwordHash: adminPasswordHash,
      status: "ACTIVE",
      isVerified: true,
      profile: {
        create: {
          firstName: "System",
          lastName: "Administrator",
          jobTitle: "Principal Platform Admin",
        },
      },
      userRoles: {
        create: {
          roleId: superAdminRole.id,
        },
      },
    },
  });

  // 4. Seed Default Buyer User
  console.log("Seeding default Buyer user (buyer@yrcglobal.com)...");
  const buyerPasswordHash = await hashPassword("BuyerPassword123!");
  const buyerRole = await prisma.role.findUniqueOrThrow({
    where: { code: RoleCodes.BUYER },
  });

  await prisma.user.upsert({
    where: { email: "buyer@yrcglobal.com" },
    update: {},
    create: {
      email: "buyer@yrcglobal.com",
      passwordHash: buyerPasswordHash,
      status: "ACTIVE",
      isVerified: true,
      profile: {
        create: {
          firstName: "Industrial",
          lastName: "Buyer",
          jobTitle: "Procurement Officer",
        },
      },
      userRoles: {
        create: {
          roleId: buyerRole.id,
        },
      },
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log("  Super Admin: admin@yrcglobal.com / AdminPassword123!");
  console.log("  Buyer:       buyer@yrcglobal.com / BuyerPassword123!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
