import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connect from "@/db";
import UserModel from "@/models/users";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("reqBody", reqBody);
    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    //hash password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("savedUser", savedUser);

    //send verification Email
    return NextResponse.json({
      message: "User Created Successfully!",
      success: true,
      savedUser,
    });
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
