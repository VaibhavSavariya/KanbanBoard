import connect from "@/db";
import BoardModel from "@/models/boards";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
connect();
export async function GET(req) {
  try {
    const token = cookies().get("token")?.value;
    const id = req.url.slice(req.url.lastIndexOf("/") + 1);
    const isValidToken = () => {
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded;
      } catch (error) {
        cookies().delete("token");
        return null;
      }
    };
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
      const boardById = await BoardModel.findById(id);
      const response = NextResponse.json(
        {
          message: "Board fetched successfully!",
          boardById,
        },
        { status: 200 }
      );
      return response;
    }
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message });
  }
}
