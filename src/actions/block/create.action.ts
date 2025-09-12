"use server";

import BlockModel from "@/models/block.model";
import { validate } from "@/util/validate.util";
import UserModel from "@/models/user.model";
import { CreateBlockDTO } from "@/types/block";
import { getDB } from "@/lib/db";
export const createBlock = async (data: CreateBlockDTO) => {
  try {
    await getDB();
    const { path, timestamp, title, description } = data;
    const { email, authId } = await validate({ path });

    const user = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });

    if (!user) {
      console.warn(`[CREATE BLOCK] Account ${email} not found`);
      return { sucess: false, message: "Account not found" };
    }
    const block = await BlockModel.create({
      title,
      timestamp,
      description,
      userId: user._id.toString(),
    });

    return { success: true, message: "Block created created successfully" };
  } catch (err) {
    console.error(`[CREATE BLOCK] Error creating block ${err}`);
    return { sucess: false, message: "Internal Server Error" };
  }
};
