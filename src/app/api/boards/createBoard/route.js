import connect from "@/db";
import BoardModel from "@/models/boards";
import { NextResponse } from "next/server";
connect();
export async function POST(req) {
  try {
    const reqBdy = await req.json();
    const board = await BoardModel.create(reqBdy);
    const response = NextResponse.json(
      {
        message: "Board created successfully!",
        board,
      },
      { status: 201 }
    );
    return response;
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message });
  }
}
