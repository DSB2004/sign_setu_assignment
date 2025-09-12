import { Queue } from "bullmq";
import { redis } from "@/lib/redis";
import { QUEUE_ENUM } from "@/types/queue";

export const EmailCron = async () => {
  const queue = new Queue(QUEUE_ENUM.EMAIL_QUEUE, { connection: redis });

  await queue.add(
    "reminder.email",
    { message: "Sample Email" },
    {
      repeat: { every: 10 * 1000 },
      removeOnComplete: true,
      removeOnFail: true,
    }
  );

  console.log("[EMAIL CRON] Reminder email scheduled to run every minute");
};
