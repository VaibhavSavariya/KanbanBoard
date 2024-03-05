import connect from "@/db";
import BoardModel from "@/models/boards";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
connect();
export async function POST(req) {
  try {
    const token = cookies().get("token")?.value;
    const decoded = jwtDecode(token);
    const isValidToken = () => {
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded;
      } catch (error) {
        cookies().delete("token");
        return null;
      }
    };
    const reqBdy = await req.json();

    if (!token) {
      const tokenRes = NextResponse.json(
        {
          message: "Token is missing. Please login.",
        },
        { status: 400 }
      );
      return tokenRes;
    } else if (!isValidToken()) {
      const tokenRes = NextResponse.json(
        {
          message: "Your Session is Expired. Please login.",
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
