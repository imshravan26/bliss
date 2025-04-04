"use server";

import User from "@/lib/models/user";
import dbConnect from "../dbConnect";

export async function createUser(user: any) {
  try {
    await dbConnect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
}
