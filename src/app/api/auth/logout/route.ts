import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";
import { getSessionCookie, clearSessionCookie } from "@/lib/auth/cookies";

export async function POST() {
  try {
    const sessionToken = await getSessionCookie();

    if (sessionToken) {
      await destroySession(sessionToken);
    }

    await clearSessionCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
