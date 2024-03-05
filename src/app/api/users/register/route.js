import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import connect from "@/db";
import UserModel from "@/models/users";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    } else {
      //hash password

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const uniqueString = Math.floor(Math.random() * 9000);

      const newUser = new UserModel({
        email,
        password: hashedPassword,
        uniqueString,
      });
      const savedUser = await newUser.save();

      //send verification Email
      await sendEmail({ email, uniqueString });
      const response = NextResponse.json(
        {
          message: "OTP has been sent successfully to your mail.",
          success: true,
          savedUser,
        },
        {
          status: 201,
        }
      );
      return response;
    }
  } catch (error) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
