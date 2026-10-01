"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // strip HTML tags
    .trim();
}

export async function submitRfqAction(formData: FormData) {
  const rawTitle = sanitizeText(formData.get("title") || formData.get("productTitle"));
  const title = rawTitle || "Industrial Equipment Inquiry";
  const productId = sanitizeText(formData.get("productId")) || null;
  const productTitle = sanitizeText(formData.get("productTitle"));
  
  const rawQty = parseInt(sanitizeText(formData.get("quantity")) || "1", 10);
  const quantity = isNaN(rawQty) || rawQty < 1 ? 1 : Math.min(rawQty, 1000000);

  const deliveryLocation = sanitizeText(formData.get("deliveryLocation"));
  const targetDateStr = sanitizeText(formData.get("targetDate"));
  const rawDescription = sanitizeText(formData.get("description") || formData.get("requirements"));
  
  const buyerName = sanitizeText(formData.get("buyerName"));
  const buyerEmail = sanitizeText(formData.get("buyerEmail")).toLowerCase();
  const buyerPhone = sanitizeText(formData.get("buyerPhone"));

  // Compile detailed requirements notes
  const contactSegments: string[] = [];
  if (buyerName) contactSegments.push(`Contact: ${buyerName}`);
  if (buyerEmail) contactSegments.push(`Email: ${buyerEmail}`);
  if (buyerPhone) contactSegments.push(`Phone: ${buyerPhone}`);

  const compiledDescription = [
    contactSegments.length > 0 ? contactSegments.join(" | ") : "",
    rawDescription ? `Requirements: ${rawDescription}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  // Determine buyer
  let buyerUserId: string | undefined;
  try {
    const user = await getCurrentUser();
    buyerUserId = user?.id;
  } catch (e) {
    // Outside request context
  }

  if (!buyerUserId) {
    // If a guest provides an email, look for existing user or use platform buyer
    if (buyerEmail && buyerEmail.includes("@")) {
      const existingUser = await prisma.user.findUnique({ where: { email: buyerEmail } });
      buyerUserId = existingUser?.id;
    }
  }

  if (!buyerUserId) {
    // Default platform buyer for guest inquiries
    const defaultBuyer = await prisma.user.findUnique({
      where: { email: "buyer@yrcglobal.com" },
    });
    buyerUserId = defaultBuyer?.id;
  }

  if (!buyerUserId) {
    throw new Error("Unable to establish buyer identity for RFQ creation.");
  }

  const rfqNumber = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const targetDate = targetDateStr ? new Date(targetDateStr) : null;

  await prisma.rfq.create({
    data: {
      rfqNumber,
      buyerUserId,
      title: title.slice(0, 150),
      description: compiledDescription || null,
      status: "SUBMITTED",
      deliveryLocation: deliveryLocation ? deliveryLocation.slice(0, 200) : null,
      targetDate,
      items: {
        create: {
          productId,
          customItemName: (productTitle || title).slice(0, 150),
          quantity,
          targetSpecs: rawDescription ? rawDescription.slice(0, 2000) : null,
        },
      },
    },
  });

  redirect(`/rfq/success?rfqNumber=${rfqNumber}`);
}

