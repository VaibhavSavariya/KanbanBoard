import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { jwt } = reqBody;
    cookies().set("token", jwt);
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message });
    console.log("error:", error);
  }
}
