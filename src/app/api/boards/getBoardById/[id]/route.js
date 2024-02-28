import connect from "@/db";
import BoardModel from "@/models/boards";
import { NextResponse } from "next/server";
connect();
export async function GET(req) {
  try {
    const id = req.url.slice(req.url.lastIndexOf("/") + 1);
    const boardById = await BoardModel.findById(id);
    if (!boardById) {
      return NextResponse.json(
        {
          message: "Board not found",
        },
        { status: 404 }
      );
    }
    const response = NextResponse.json(
      {
        message: "Board fetched successfully!",
        boardById,
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message });
  }
}
