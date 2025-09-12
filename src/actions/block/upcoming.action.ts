"use server";
import { getDB } from "@/lib/db";
import BlockModel from "@/models/block.model";
import { validate } from "@/util/validate.util";
import UserModel from "@/models/user.model";
import { Block } from "@/types/block";
interface UpcomingBlockDTO {
  path: string;
}

export const upcomingBlock = async (data: UpcomingBlockDTO) => {
  try {
    await getDB();
    const { path } = data;
    const { email, authId } = await validate({ path });
    await getDB();
    const user = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });
    if (!user) {
      console.warn(`[UPCOMING BLOCK] Account ${email} not found`);
      return { sucess: false, message: "Account not found" };
    }

    const now = new Date();
    const next24 = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const blocks = (
      await BlockModel.find({
        userId: user.id,
        timestamp: { $gte: now, $lte: next24 },
      })
    ).map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      timestamp: doc.timestamp,
      userId: doc.userId.toString(),
    })) as Block[];

    return { success: true, message: `Blocks for user ${user.id}`, blocks };
  } catch (err) {
    console.error(`[UPCOMING BLOCK] Error getting blocks ${err}`);
    return { sucess: false, message: "Internal Server Error" };
  }
};
