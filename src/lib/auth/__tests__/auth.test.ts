import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "../password";
import { Permissions, RoleCodes, DefaultRolePermissions } from "@/lib/rbac/permissions";

describe("Password Hashing & Verification (scrypt)", () => {
  it("should securely hash a plaintext password with salt", async () => {
    const raw = "IndustrialSecure123!";
    const hash = await hashPassword(raw);

    expect(hash).toBeDefined();
    expect(hash.startsWith("scrypt$")).toBe(true);

    const parts = hash.split("$");
    expect(parts.length).toBe(3);
    expect(parts[1].length).toBe(32); // 16 bytes in hex = 32 chars
    expect(parts[2].length).toBe(128); // 64 bytes in hex = 128 chars
  });

  it("should correctly verify matching password", async () => {
    const raw = "SuperSecretPassword!";
    const hash = await hashPassword(raw);

    const isMatch = await verifyPassword(raw, hash);
    expect(isMatch).toBe(true);
  });

  it("should reject incorrect password", async () => {
    const raw = "CorrectPassword123";
    const wrong = "WrongPassword456";
    const hash = await hashPassword(raw);

    const isMatch = await verifyPassword(wrong, hash);
    expect(isMatch).toBe(false);
  });

  it("should reject malformed hashes gracefully without throwing", async () => {
    expect(await verifyPassword("test", "not_a_valid_hash")).toBe(false);
    expect(await verifyPassword("test", "bcrypt$foo$bar")).toBe(false);
  });
});

describe("RBAC Permissions & Roles Matrix", () => {
  it("should grant all permissions to SUPER_ADMIN", () => {
    const superAdminPerms = DefaultRolePermissions.SUPER_ADMIN;
    const allPerms = Object.values(Permissions);
    expect(superAdminPerms.length).toBe(allPerms.length);
    for (const p of allPerms) {
      expect(superAdminPerms).toContain(p);
    }
  });

  it("should grant catalogue review and publish to CATALOGUE_ADMIN", () => {
    const catPerms = DefaultRolePermissions.CATALOGUE_ADMIN;
    expect(catPerms).toContain(Permissions.CATALOGUE_REVIEW);
    expect(catPerms).toContain(Permissions.CATALOGUE_PUBLISH);
    expect(catPerms).toContain(Permissions.DOCUMENT_READ_PRIVATE);
  });

  it("should not grant administrative permissions to BUYER", () => {
    const buyerPerms = DefaultRolePermissions.BUYER;
    expect(buyerPerms).toContain(Permissions.RFQ_CREATE);
    expect(buyerPerms).toContain(Permissions.ORDERS_CREATE);
    expect(buyerPerms).not.toContain(Permissions.CATALOGUE_REVIEW);
    expect(buyerPerms).not.toContain(Permissions.USERS_MANAGE);
    expect(buyerPerms).not.toContain(Permissions.CATALOGUE_PUBLISH);
  });

  it("should verify defined role codes", () => {
    expect(RoleCodes.SUPER_ADMIN).toBe("SUPER_ADMIN");
    expect(RoleCodes.BUYER).toBe("BUYER");
    expect(RoleCodes.MANUFACTURER).toBe("MANUFACTURER");
  });
});
