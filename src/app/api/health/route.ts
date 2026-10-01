import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const startTime = Date.now();

  try {
    // Verify database connectivity
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startTime;

    return NextResponse.json(
      {
        status: "ok",
        service: "yrc-global-platform",
        environment: process.env.NODE_ENV || "development",
        timestamp: new Date().toISOString(),
        database: {
          status: "connected",
          latencyMs,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    return NextResponse.json(
      {
        status: "degraded",
        service: "yrc-global-platform",
        timestamp: new Date().toISOString(),
        database: {
          status: "disconnected",
          error: error instanceof Error ? error.message : "Database connection failed",
          latencyMs,
        },
      },
      { status: 503 }
    );
  }
}
