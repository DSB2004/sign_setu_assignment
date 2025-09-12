"use server";
import UserModel from "@/models/user.model";
import { validate } from "@/util/validate.util";
import { UpdateAccountDTO } from "@/types/user";
import { getDB } from "@/lib/db";
export const updateAccount = async (data: UpdateAccountDTO) => {
  const { username, path, bio } = data;
  try {
    await getDB();
    const { email, authId } = await validate({ path });
    const user = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });
    if (!user) {
      console.warn(`[UPDATE ACCOUNT] Account doesn't exist ${email}`);
      return { sucess: false, message: "Account doesn't exist" };
    }
    user.username = username;
    user.bio = bio;
    await user.save();

    return { success: true, message: "User account updated successfully" };
  } catch (err) {
    console.error(`[UPDATE ACCOUNT] Error updating user account ${err}`);
    return { sucess: false, message: "Internal Server Error" };
  }
};
