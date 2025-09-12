"use server";

import BlockModel from "@/models/block.model";
import { validate } from "@/util/validate.util";
import UserModel from "@/models/user.model";
import { DeleteBlockDTO } from "@/types/block";
import { getDB } from "@/lib/db";
export const deleteBlock = async (data: DeleteBlockDTO) => {
  try {
    await getDB();
    const { path, id } = data;
    const { email, authId } = await validate({ path });

    const user = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });
    if (!user) {
      console.warn(`[DELETE BLOCK] Account ${email} not found`);
      return { sucess: false, message: "Account not found" };
    }

    const block = await BlockModel.findById(id);

    if (!block || block === null) {
      console.warn(`[DELETE BLOCK] Block ${id} not found`);
      return { success: false, message: `Block not found` };
    }
    await block.deleteOne();
    return { success: true, message: `Block Deleted`, id: data.id };
  } catch (err) {
    console.error(`[DELETE BLOCK] Error getting block ${err}`);
    return { sucess: false, message: "Internal Server Error" };
  }
};
