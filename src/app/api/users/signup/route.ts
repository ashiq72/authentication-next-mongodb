import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(requst: NextRequest) {
  try {
    const reqBody = await requst.json();
    const { username, email, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const saveUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      saveUser,
    });

    console.log(reqBody);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
