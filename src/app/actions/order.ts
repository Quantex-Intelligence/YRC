"use server";

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

interface OrderItemInput {
  variantId: string;
  snapshotTitle: string;
  snapshotSku: string;
  unitPriceMinor: number;
  quantity: number;
  totalPriceMinor: number;
}

interface CreateOrderPayload {
  customerName: string;
  email: string;
  phone?: string;
  companyName?: string;
  gstin?: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItemInput[];
  subtotalMinor: number;
  taxMinor: number;
  totalAmountMinor: number;
}

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>?/gm, "").trim();
}

export async function createOrderAction(payload: CreateOrderPayload) {
  // Validate items
  if (!payload.items || payload.items.length === 0) {
    return { success: false, error: "Cart is empty." };
  }

  const customerName = sanitize(payload.customerName);
  const email = sanitize(payload.email).toLowerCase();
  const phone = sanitize(payload.phone);
  const gstin = sanitize(payload.gstin).toUpperCase();

  if (!customerName || customerName.length < 2) {
    return { success: false, error: "Please enter a valid company contact or procurement officer name." };
  }

  if (!email || !email.includes("@")) {
    return { success: false, error: "Please provide a valid corporate email address." };
  }

  // Sanitize shipping address
  const shippingAddress = {
    line1: sanitize(payload.shippingAddress.line1),
    line2: sanitize(payload.shippingAddress.line2),
    city: sanitize(payload.shippingAddress.city),
    state: sanitize(payload.shippingAddress.state),
    postalCode: sanitize(payload.shippingAddress.postalCode).replace(/\s+/g, ""),
    country: sanitize(payload.shippingAddress.country) || "India",
  };

  if (!shippingAddress.line1 || !shippingAddress.city || !shippingAddress.postalCode) {
    return { success: false, error: "Please complete all required shipping address fields." };
  }

  const billingAddress = {
    line1: sanitize(payload.billingAddress.line1) || shippingAddress.line1,
    city: sanitize(payload.billingAddress.city) || shippingAddress.city,
    state: sanitize(payload.billingAddress.state) || shippingAddress.state,
    postalCode: sanitize(payload.billingAddress.postalCode) || shippingAddress.postalCode,
    country: sanitize(payload.billingAddress.country) || "India",
  };

  // Determine buyer
  let buyerUserId: string | undefined;
  try {
    const user = await getCurrentUser();
    buyerUserId = user?.id;
  } catch (e) {
    // Outside request context
  }

  if (!buyerUserId && email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    buyerUserId = existing?.id;
  }

  if (!buyerUserId) {
    const defaultBuyer = await prisma.user.findUnique({
      where: { email: "buyer@yrcglobal.com" },
    });
    buyerUserId = defaultBuyer?.id;
  }

  if (!buyerUserId) {
    return { success: false, error: "Buyer profile not found." };
  }

  const orderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

  try {
    const order = await prisma.order.create({
      data: {
        orderNumber,
        buyerUserId,
        status: "CONFIRMED",
        subtotalMinor: BigInt(payload.subtotalMinor),
        taxMinor: BigInt(payload.taxMinor),
        shippingMinor: BigInt(0),
        totalAmountMinor: BigInt(payload.totalAmountMinor),
        currency: "INR",
        shippingAddressJson: JSON.stringify(shippingAddress),
        billingAddressJson: JSON.stringify(billingAddress),
        items: {
          create: payload.items.map((i) => ({
            variantId: i.variantId,
            snapshotTitle: i.snapshotTitle,
            snapshotSku: i.snapshotSku,
            unitPriceMinor: BigInt(i.unitPriceMinor),
            quantity: i.quantity,
            totalPriceMinor: BigInt(i.totalPriceMinor),
          })),
        },
        payments: {
          create: {
            provider: "DEV_MOCK",
            providerTransactionId: `TXN-${Date.now()}`,
            amountMinor: BigInt(payload.totalAmountMinor),
            currency: "INR",
            status: "SUCCESS",
          },
        },
      },
    });

    return { success: true, orderNumber: order.orderNumber };
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return { success: false, error: error.message || "Failed to process order." };
  }
}
