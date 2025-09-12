"use server";
import BlockModel from "@/models/block.model";
import { validate } from "@/util/validate.util";
import UserModel from "@/models/user.model";
import { Block } from "@/types/block";
import { getDB } from "@/lib/db";
interface GetBlockDTO {
  path: string;
  id: string;
}

export const getBlock = async (data: GetBlockDTO) => {
  try {
    await getDB();
    const { path, id } = data;
    const { email, authId } = await validate({ path });

    const user = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });
    if (!user) {
      console.warn(`[GET BLOCK] Account ${email} not found`);
      return { success: false, message: "Account not found" };
    }

    const doc = await BlockModel.findById(id);

    if (!doc || doc === null) {
      console.warn(`[GET BLOCK] Block ${id} not found`);
      return { success: false, message: `Block not found` };
    }

    const block = {
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      timestamp: doc.timestamp,
      userId: doc.userId.toString(),
      repeat: doc.repeat,
      active: doc.active,
    };
    return { success: true, message: `Block found`, block };
  } catch (err) {
    console.error(`[GET BLOCK] Error getting block ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
