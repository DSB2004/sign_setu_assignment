"use server";
import UserModel from "@/models/user.model";
import { validate } from "@/util/validate.util";
import { User } from "@/types/user";
import { getDB } from "@/lib/db";
interface GetUserDTO {
  path: string;
}

export const getAccount = async (data: GetUserDTO) => {
  const { path } = data;
  try {
    await getDB();
    const { email, authId } = await validate({ path });
    const doc = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });

    if (!doc) {
      console.warn(`[GET ACCOUNT] Account doesn't exist ${email}`);
      return { success: false, message: "Account doesn't exist" };
    }

    const user: User = {
      id: doc._id.toString(),
      username: doc.username,
      email: doc.email,
      bio: doc.bio,
      avatar: doc.avatar,
    };
    return { success: true, message: "User account found", user };
  } catch (err) {
    console.error(`[GET ACCOUNT] Error getting user account ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
