import connect from "@/db";
import BoardModel from "@/models/boards";
import { NextResponse } from "next/server";
connect();
export async function GET() {
  try {
    const boards = await BoardModel.find(
      {},
      { _id: true, name: true, color: true, createdAt: true }
    ).sort({
      createdAt: -1,
    });
    const response = NextResponse.json(
      {
        message: "Boards fetched successfully!",
        boards,
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message });
  }
}
