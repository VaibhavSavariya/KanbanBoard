import connect from "@/db";
import BoardModel from "@/models/boards";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
connect();
export async function PUT(req) {
  try {
    const token = cookies().get("token")?.value;
    const id = req.url.slice(req.url.lastIndexOf("/") + 1);
    const reqBody = await req.json();
    if (!token) {
      const tokenRes = NextResponse.json(
        {
          message: "Token is missing. Please login.",
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
