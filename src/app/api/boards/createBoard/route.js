import connect from "@/db";
import BoardModel from "@/models/boards";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
connect();
export async function POST(req) {
  try {
    const token = cookies().get("token")?.value;
    const reqBdy = await req.json();

    if (!token) {
      const tokenRes = NextResponse.json(
        {
          message: "Token is missing. Please login.",
        },
        { status: 400 }
      );
      return tokenRes;
    } else {
      const board = await BoardModel.create(reqBdy);
      const response = NextResponse.json(
        {
          message: "Board created successfully!",
          board,
        },
        { status: 201 }
      );
      return response;
    }
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message });
  }
}