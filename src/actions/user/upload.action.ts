import UserModel from "@/models/user.model";
import { validate } from "@/util/validate.util";
import { uploadAvatar } from "@/worker/service/image.service";
interface UploadAvatarDTO {
  avatar: Buffer;
  path: string;
}

export const uploadUserAvatar = async (data: UploadAvatarDTO) => {
  const { avatar, path } = data;
  try {
    const { email, authId } = await validate({ path });
    const user = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });
    if (!user) {
      console.warn(`[UPLOAD AVATAR] Account doesn't exist ${email}`);
      return { sucess: false, message: "Account doesn't exist" };
    }
    await uploadAvatar({ userId: user._id.toString(), avatar });

    return { success: true, message: "User avatar will be updated shortly" };
  } catch (err) {
    console.error(`[UPLOAD AVATAR] Error updating user avatar ${err}`);
    return { sucess: false, message: "Internal Server Error" };
  }
};
