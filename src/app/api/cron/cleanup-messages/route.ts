import { NextResponse } from "next/server";
import { cleanupOldMessages } from "@/lib/message-cleanup";

// This endpoint can be called by a cron job (e.g., Vercel Cron, external scheduler)
// Add authentication header check in production
export async function GET(req: Request) {
  try {
    // Verify cron secret (add to .env)
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET || "dev-secret";
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const result = await cleanupOldMessages();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json(
      { error: "Cleanup failed" },
      { status: 500 }
    );
  }
}

// Allow calling via POST as well
export async function POST(req: Request) {
  return GET(req);
}
