import { getCurrentUser, SessionUser } from "./session";
import { PermissionCode, RoleCode } from "@/lib/rbac/permissions";

export class AuthError extends Error {
  constructor(message: string, public statusCode: number = 401) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * Asserts that a request is authenticated.
 */
export async function requireAuth(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthError("Authentication required to access this resource", 401);
  }
  return user;
}

/**
 * Asserts that the authenticated user possesses the specified granular permission.
 */
export async function requirePermission(permission: PermissionCode): Promise<SessionUser> {
  const user = await requireAuth();
  if (!user.permissions.includes(permission)) {
    throw new AuthError(
      `Access denied: missing required permission '${permission}'`,
      403
    );
  }
  return user;
}

/**
 * Asserts that the authenticated user possesses one of the specified roles.
 */
export async function requireRole(allowedRoles: RoleCode[]): Promise<SessionUser> {
  const user = await requireAuth();
  const hasRole = user.roles.some((r) => allowedRoles.includes(r));
  if (!hasRole) {
    throw new AuthError("Access denied: insufficient role privileges", 403);
  }
  return user;
}

/**
 * Asserts that the user has tenant access to the specified company,
 * or is a platform administrator with cross-tenant authority.
 */
export async function requireCompanyAccess(companyId: string): Promise<SessionUser> {
  const user = await requireAuth();
  const isSuperAdmin = user.roles.includes("SUPER_ADMIN") || user.roles.includes("ADMIN");
  if (isSuperAdmin) {
    return user;
  }
  const hasMembership = user.companies.some((c) => c.companyId === companyId);
  if (!hasMembership) {
    throw new AuthError("Access denied: user is not an authorized member of this company", 403);
  }
  return user;
}
