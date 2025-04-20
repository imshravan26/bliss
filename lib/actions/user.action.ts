"use server";

import { User } from "@/lib/db/models/user";
import connectToDB from "@/lib/db/connect";

export async function createUser(user: any) {
  try {
    await connectToDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
}
