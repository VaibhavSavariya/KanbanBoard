import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connect from "@/db";
import UserModel from "@/models/users";
import { cookies, headers } from "next/headers";

connect();

export async function POST(req) {
  try {
    const reqBdy = await req.json();
    const { email, password } = reqBdy;
    // check if user exists

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }
    // Create token data
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      tokenData,
    });
    cookies().set("token", token);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
