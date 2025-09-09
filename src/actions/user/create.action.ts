import UserModel from "@/models/user.model";
import { validate } from "@/util/validate.util";
import { uploadAvatar } from "@/worker/service/image.service";
interface CreateAccountDTO {
  username: string;
  avatar?: Buffer;
  bio?: string;
  path: string;
}

export const createAccount = async (data: CreateAccountDTO) => {
  const { username, path, avatar, bio } = data;
  try {
    const { email, authId } = await validate({ path });
    const check = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });
    if (check) {
      console.warn(`[CREATE ACCOUNT] Account already exist ${email}`);
      return { sucess: false, message: "Account already exist" };
    }
    const user = await UserModel.create({
      email,
      authId,
      username,
      bio,
    });
    if (avatar) {
      await uploadAvatar({ userId: user._id.toString(), avatar });
    }
    return { success: true, message: "User account created successfully" };
  } catch (err) {
    console.error(`[CREATE ACCOUNT] Error creating user account ${err}`);
    return { sucess: false, message: "Internal Server Error" };
  }
};
