import { UploadAvatarDTO } from "@/types/queue";
import { QUEUE_ENUM } from "@/types/queue";
import { Queue } from "bullmq";
import { redis } from "@/lib/redis";
import fs from "fs";
import path from "path";

export const uploadAvatar = async (data: UploadAvatarDTO) => {
  const queue = new Queue(QUEUE_ENUM.IMAGE_QUEUE, { connection: redis });
  const { userId, avatar } = data;

  const temp = path.join(process.cwd(), "uploads");

  const filename = `${userId}-${Date.now()}`;
  const file = path.join(temp, filename);

  fs.writeFileSync(file, avatar);

  await queue.add(QUEUE_ENUM.IMAGE_QUEUE, {
    userId,
    file,
    filename,
  });

  return true;
};
