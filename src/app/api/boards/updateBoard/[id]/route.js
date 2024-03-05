import connect from "@/db";
import BoardModel from "@/models/boards";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connect();
export async function PUT(req) {
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
    const reqBody = await req.json();
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
      await BoardModel.findById(id);
      const updatedBoard = await BoardModel.findByIdAndUpdate(id, reqBody, {
        new: true,
      });
      const response = NextResponse.json(
        {
          message: "Board udpated successfully!",
          updatedBoard,
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
