import connect from "@/db";
import BoardModel from "@/models/boards";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
connect();
export async function DELETE(req) {
  try {
    const token = cookies().get("token")?.value;
    const id = req.url.slice(req.url.lastIndexOf("/") + 1);
    const boardById = await BoardModel.findById(id);
    if (!token) {
      const tokenRes = NextResponse.json(
        {
          message: "Token is missing. Please login.",
        },
        { status: 400 }
      );
      return tokenRes;
    } else if (!boardById) {
      return NextResponse.json(
        {
          message: "Board not found",
        },
        { status: 404 }
      );
    } else {
      await BoardModel.findByIdAndDelete(id);
      const response = NextResponse.json(
        {
          message: "Board deleted successfully!",
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
