import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successful",
      success: true,
    });
    cookies().set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
