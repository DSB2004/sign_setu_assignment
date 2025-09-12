"use server";
import BlockModel from "@/models/block.model";
import { validate } from "@/util/validate.util";
import UserModel from "@/models/user.model";
import { Block } from "@/types/block";
import { getDB } from "@/lib/db";
interface GetAllBlockDTO {
  path: string;
  search: string | null;
  page: number | null;
  limit: number | null;
}

export const getAllBlock = async (data: GetAllBlockDTO) => {
  try {
    await getDB();
    let { path, search, page, limit } = data;
    const { email, authId } = await validate({ path });

    const user = await UserModel.findOne({
      $or: [{ authId }, { email }],
    });
    if (!user) {
      console.warn(`[GET ALL BLOCK] Account ${email} not found`);
      return { success: false, message: "Account not found" };
    }

    if (page === null) {
      page = 1;
    }

    if (limit === null) {
      limit = 10;
    }

    const skip = (page - 1) * limit;

    const query: any = { userId: user.id };
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const blocks = (
      await BlockModel.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ timestamp: -1 })
    ).map((doc: any) => ({
      id: doc._id.toString(),
      title: doc.title,
      description: doc.description,
      timestamp: doc.timestamp,
      userId: doc.userId.toString(),
    })) as Block[];

    const total = await BlockModel.countDocuments(query);

    return {
      success: true,
      message: `Blocks for user ${user.id}`,
      blocks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error(`[GET ALL BLOCK] Error getting blocks ${err}`);
    return { success: false, message: "Internal Server Error" };
  }
};
