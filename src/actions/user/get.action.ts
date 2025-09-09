import UserModel from "@/models/user.model";
import { validate } from "@/util/validate.util";

interface GetUserDTO {
  path: string;
}

export const createAccount = async (data: GetUserDTO) => {
  const { path } = data;
  try {
    const { email, authId } = await validate({ path });
    const user = await UserModel.findOne({
      $or: [{ authId }, { email }],
    })
      .select("authId email username avatar bio")
      .lean();
    if (!user) {
      console.warn(`[GET ACCOUNT] Account doesn't exist ${email}`);
      return { sucess: false, message: "Account doesn't exist" };
    }

    return { success: true, message: "User account found", user };
  } catch (err) {
    console.error(`[GET ACCOUNT] Error getting user account ${err}`);
    return { sucess: false, message: "Internal Server Error" };
  }
};
