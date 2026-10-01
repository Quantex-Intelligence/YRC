"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/session";
import { RoleCodes } from "@/lib/rbac/permissions";

const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  roleCode: z.enum([RoleCodes.BUYER, RoleCodes.BUSINESS_BUYER, RoleCodes.SUPPLIER, RoleCodes.MANUFACTURER]),
  companyName: z.string().optional(),
});

export interface AuthActionResult {
  success: boolean;
  error?: string;
}

export async function loginAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid input data",
    };
  }

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    if (user.status !== "ACTIVE") {
      return {
        success: false,
        error: "Account is suspended or deactivated. Contact support.",
      };
    }

    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    await createSession(user.id);

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        entityType: "USER",
        entityId: user.id,
        action: "LOGIN",
      },
    }).catch(() => {});
  } catch (err) {
    console.error("Login failure:", err);
    return {
      success: false,
      error: "An unexpected error occurred during authentication",
    };
  }

  redirect("/");
}

export async function registerAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    roleCode: formData.get("roleCode"),
    companyName: formData.get("companyName"),
  };

  const parsed = registerSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid input data",
    };
  }

  const { email, password, firstName, lastName, roleCode, companyName } = parsed.data;

  try {
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return {
        success: false,
        error: "An account with this email address already exists",
      };
    }

    const passwordHash = await hashPassword(password);
    const role = await prisma.role.findUniqueOrThrow({
      where: { code: roleCode },
    });

    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        status: "ACTIVE",
        isVerified: false,
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
        userRoles: {
          create: {
            roleId: role.id,
          },
        },
      },
    });

    // If company name was provided for a business account, register company draft
    if (companyName && (roleCode === RoleCodes.SUPPLIER || roleCode === RoleCodes.MANUFACTURER || roleCode === RoleCodes.BUSINESS_BUYER)) {
      const slug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "-" + Math.random().toString(36).substring(2, 6);
      const company = await prisma.company.create({
        data: {
          legalName: companyName,
          slug,
          companyType: roleCode === RoleCodes.MANUFACTURER ? "Manufacturer" : "Commercial Enterprise",
          isVerified: false,
        },
      });

      await prisma.companyUser.create({
        data: {
          companyId: company.id,
          userId: user.id,
          tenantRole: "OWNER",
        },
      });
    }

    await createSession(user.id);
  } catch (err) {
    console.error("Registration failure:", err);
    return {
      success: false,
      error: "An unexpected error occurred during account creation",
    };
  }

  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}

// In-memory OTP storage for instantaneous validation
const otpStore = new Map<string, { code: string; expiresAt: number }>();

/**
 * Dispatches an OTP to the given email address.
 * In development / demo environment, returns the generated code so the UI can preview it.
 */
export async function requestOtpAction(email: string): Promise<{ success: boolean; message: string; devOtp?: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, message: "Please provide a valid business or personal email address." };
  }

  const normalizedEmail = email.trim().toLowerCase();
  // Generate a realistic 6-digit numeric OTP
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore.set(normalizedEmail, { code, expiresAt });

  return {
    success: true,
    message: `Verification OTP has been dispatched to ${normalizedEmail}`,
    devOtp: code,
  };
}

/**
 * Validates OTP and creates user session. If user does not exist, registers them automatically.
 */
export async function verifyOtpAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const otp = (formData.get("otp") as string)?.trim();
  const roleCode = (formData.get("roleCode") as string) || RoleCodes.BUYER;
  const fullName = (formData.get("fullName") as string)?.trim();

  if (!email || !email.includes("@")) {
    return { success: false, error: "Valid email address is required" };
  }

  if (!otp || otp.length < 6) {
    return { success: false, error: "Please enter the complete 6-digit OTP code" };
  }

  const stored = otpStore.get(email);
  // Accept stored OTP or master test code '123456' for testing convenience
  const isMatch = (stored && stored.code === otp && stored.expiresAt > Date.now()) || otp === "123456";

  if (!isMatch) {
    return { success: false, error: "Invalid or expired OTP. Please request a new code or use test code 123456." };
  }

  // OTP is verified; remove from store
  otpStore.delete(email);

  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Auto-register user via OTP
      const role = await prisma.role.findFirst({
        where: { code: roleCode },
      }) || await prisma.role.findFirst({ where: { code: RoleCodes.BUYER } });

      if (!role) {
        return { success: false, error: "User role configuration error" };
      }

      const dummyHash = await hashPassword("OtpVerifiedAcc123!");
      const nameParts = (fullName || "Enterprise User").split(" ");
      const firstName = nameParts[0] || "Industrial";
      const lastName = nameParts.slice(1).join(" ") || "Buyer";

      user = await prisma.user.create({
        data: {
          email,
          passwordHash: dummyHash,
          status: "ACTIVE",
          isVerified: true,
          profile: {
            create: {
              firstName,
              lastName,
            },
          },
          userRoles: {
            create: {
              roleId: role.id,
            },
          },
        },
      });
    }

    if (user.status !== "ACTIVE") {
      return { success: false, error: "Account suspended or deactivated. Contact support." };
    }

    await createSession(user.id);
  } catch (err) {
    console.error("OTP verification error:", err);
    return { success: false, error: "Failed to authenticate session. Please try again." };
  }

  redirect("/");
}

/**
 * 1-Click Demo Login: instantly logs in as Super Admin, Buyer, or Supplier
 */
export async function quickDemoLoginAction(roleType: "ADMIN" | "BUYER" | "SUPPLIER"): Promise<void> {
  let targetEmail = "buyer@yrcglobal.com";
  let targetRoleCode: string = RoleCodes.BUYER;

  if (roleType === "ADMIN") {
    targetEmail = "admin@yrcglobal.com";
    targetRoleCode = RoleCodes.SUPER_ADMIN;
  } else if (roleType === "SUPPLIER") {
    targetEmail = "supplier@yrcglobal.com";
    targetRoleCode = RoleCodes.SUPPLIER;
  }

  let user = await prisma.user.findUnique({
    where: { email: targetEmail },
  });

  if (!user) {
    const role = await prisma.role.findFirst({
      where: { code: targetRoleCode },
    });
    const hash = await hashPassword("DemoPassword123!");

    user = await prisma.user.create({
      data: {
        email: targetEmail,
        passwordHash: hash,
        status: "ACTIVE",
        isVerified: true,
        profile: {
          create: {
            firstName: roleType === "ADMIN" ? "Platform" : roleType === "SUPPLIER" ? "Alpha" : "Industrial",
            lastName: roleType === "ADMIN" ? "Administrator" : roleType === "SUPPLIER" ? "Manufacturer" : "Buyer",
          },
        },
        userRoles: role
          ? {
              create: {
                roleId: role.id,
              },
            }
          : undefined,
      },
    });
  }

  await createSession(user.id);
  redirect(roleType === "ADMIN" ? "/admin" : "/");
}

