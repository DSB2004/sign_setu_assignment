"use server";
import UserModel from "@/models/user.model";
import { validate } from "@/util/validate.util";
import { CreateAccountDTO } from "@/types/user";
import { getDB } from "@/lib/db";
export const createAccount = async (data: CreateAccountDTO) => {
  const { username, path, bio } = data;
  try {
    await getDB();
    const { email, authId } = await validate({ path });
    const check = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });
    if (check) {
      console.warn(`[CREATE ACCOUNT] Account already exist ${email}`);
      return { success: false, message: "Account already exist" };
    }
    const user = await UserModel.create({
      email,
      authId,
      username,
      bio,
    });
   
    return { success: true, message: "User account created successfully" };
  } catch (err) {
    console.error(`[CREATE ACCOUNT] Error creating user account ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
