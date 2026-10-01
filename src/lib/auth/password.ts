import crypto from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(crypto.scrypt);

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

/**
 * Hashes a plaintext password using crypto.scrypt with a cryptographically secure random salt.
 * Output format: scrypt$<hex_salt>$<hex_derived_key>
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;
  return `scrypt$${salt}$${derivedKey.toString("hex")}`;
}

/**
 * Verifies a plaintext password against a stored scrypt$<hex_salt>$<hex_derived_key> string
 * using constant-time equality to prevent timing attacks.
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const parts = storedHash.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") {
    return false;
  }
  const [, salt, originalKeyHex] = parts;
  const originalKey = Buffer.from(originalKeyHex, "hex");
  const derivedKey = (await scryptAsync(password, salt, KEY_LENGTH)) as Buffer;

  if (originalKey.length !== derivedKey.length) {
    return false;
  }

  return crypto.timingSafeEqual(originalKey, derivedKey);
}
