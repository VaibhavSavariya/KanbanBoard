import connect from "@/db";
import BoardModel from "@/models/boards";
import { NextResponse } from "next/server";
connect();
export async function GET(req) {
  try {
    const id = req.url.slice(req.url.lastIndexOf("/") + 1);
    const boards = await BoardModel.find(
      { userRef: id },
      { _id: true, name: true, color: true, createdAt: true, userRef: true }
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
