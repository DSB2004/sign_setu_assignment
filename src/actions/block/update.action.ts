"use server";
import BlockModel from "@/models/block.model";
import { validate } from "@/util/validate.util";
import UserModel from "@/models/user.model";
import { UpdateBlockDTO } from "@/types/block";
import { getDB } from "@/lib/db";

export const updateBlock = async (data: UpdateBlockDTO) => {
  try {
    await getDB();
    const { path, timestamp, title, id, description, repeat, active } = data;
    const { email, authId } = await validate({ path });

    const user = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });
    if (!user) {
      console.warn(`[UPDATE BLOCK] Account ${email} not found`);
      return { sucess: false, message: "Account not found" };
    }

    const block = await BlockModel.findById(id);
    if (!block) {
      console.warn(`[UPDATE BLOCK] Block ${id} not found`);
      return { sucess: false, message: "Block not found" };
    }

    block.timestamp = timestamp;
    block.title = title;
    block.description = description;
    block.repeat = repeat;
    block.active = active;

    await block.save();

    return {
      success: true,
      message: "Block updated successfully",
      id: data.id,
    };
  } catch (err) {
    console.error(`[UPDATE BLOCK] Error updating block ${err}`);
    return { sucess: false, message: "Internal Server Error" };
  }
};
