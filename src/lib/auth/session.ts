import crypto from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { DefaultRolePermissions, PermissionCode, RoleCode } from "@/lib/rbac/permissions";

export const SESSION_COOKIE_NAME = "yrc_session";
const SESSION_EXPIRY_DAYS = 7;

export interface SessionUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: RoleCode[];
  permissions: PermissionCode[];
  companies: Array<{
    companyId: string;
    companyName: string;
    slug: string;
    tenantRole: string;
  }>;
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Creates a server session, hashes the token before database persistence,
 * and sets an HttpOnly cookie.
 */
export async function createSession(userId: string): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  await prisma.session.create({
    data: {
      userId,
      tokenHash,
      expiresAt,
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return rawToken;
}

/**
 * Validates the current session from cookies, returning the user and permissions if valid.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: {
      user: {
        include: {
          profile: true,
          userRoles: {
            include: {
              role: true,
            },
          },
          companyUsers: {
            include: {
              company: true,
            },
          },
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  // Check expiration
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  const user = session.user;
  if (user.status !== "ACTIVE") {
    return null;
  }

  const roles = user.userRoles.map((ur) => ur.role.code as RoleCode);

  // Aggregate permissions from assigned roles
  const permissionsSet = new Set<PermissionCode>();
  for (const role of roles) {
    const rolePerms = DefaultRolePermissions[role] || [];
    for (const p of rolePerms) {
      permissionsSet.add(p);
    }
  }

  const companies = user.companyUsers.map((cu) => ({
    companyId: cu.companyId,
    companyName: cu.company.legalName,
    slug: cu.company.slug,
    tenantRole: cu.tenantRole,
  }));

  return {
    id: user.id,
    email: user.email,
    firstName: user.profile?.firstName,
    lastName: user.profile?.lastName,
    roles,
    permissions: Array.from(permissionsSet),
    companies,
  };
}

/**
 * Revokes the current session and clears the cookie.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    const tokenHash = hashToken(token);
    await prisma.session.deleteMany({ where: { tokenHash } }).catch(() => {});
  }
  cookieStore.delete(SESSION_COOKIE_NAME);
}
