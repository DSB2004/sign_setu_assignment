import { Worker } from "bullmq";
import { redis } from "@/lib/redis";
import { QUEUE_ENUM } from "@/types/queue";
import { ImageRepository } from "../repository/image.repository";
export const ImageWorker = () => {
  console.log("[IMAGE WORKER] ", "Registered");
  const repo = new ImageRepository();
  const worker = new Worker(
    QUEUE_ENUM.IMAGE_QUEUE,
    async (job) => {
      console.log("[IMAGE WORKER] ", job.name, job.data);
      await repo.uploadFile(job.data);
    },
    {
      connection: redis,
    }
  );

  worker.on("completed", (job) => {
    console.log("[IMAGE WORKER] ", `${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error("[IMAGE WORKER] ", `${job?.id} failed: ${err.message}`);
  });

  worker.on("error", (err) => {
    console.error("[IMAGE WORKER] ", "Worker internal error:", err);
  });
};
