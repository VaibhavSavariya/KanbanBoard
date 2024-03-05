import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import UserModel from "@/models/users";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    // check if user already exists
    const verifiedUser = await UserModel.findOne({
      uniqueString: reqBody,
    });
    if (verifiedUser) {
      verifiedUser.isVerified = true;
      await verifiedUser.save();
      const response = NextResponse.json(
        {
          message: "User Verified Successfully!",
          verifiedUser,
        },
        {
          status: 201,
        }
      );
      return response;
    } else {
      const response = NextResponse.json(
        {
          message: "User not found!",
        },
        {
          status: 400,
        }
      );
      return response;
    }
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
