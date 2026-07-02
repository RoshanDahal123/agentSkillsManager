import { clearAuthCookie } from "@/__lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    message: "Logout successful",
  });
  clearAuthCookie(response);

  return response;
}
