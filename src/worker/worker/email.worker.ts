import { Worker } from "bullmq";
import { redis } from "@/lib/redis";
import { QUEUE_ENUM } from "@/types/queue";
import { EmailRepository } from "../repository/email.repository";
export const EmailWorker = () => {
  console.log("[EMAIL WORKER] ", "Registered");
  const repo = new EmailRepository();
  const worker = new Worker(
    QUEUE_ENUM.EMAIL_QUEUE,
    async (job) => {
      console.log("[EMAIL WORKER] ", job.name, job.data);
      if (job.name === "send.email") {
        console.log("[EMAIL WORKER] Sending mail:", job.data);
        await repo.SendMail(job.data);
      } else if (job.name === "reminder.email") {
        console.log("Reminder mail called");
        await repo.RemainderMail();
      }
    },
    {
      connection: redis,
    }
  );

  worker.on("completed", (job) => {
    console.log("[EMAIL WORKER] ", `${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error("[EMAIL WORKER] ", `${job?.id} failed: ${err.message}`);
  });

  worker.on("error", (err) => {
    console.error("[EMAIL WORKER] ", "Worker internal error:", err);
  });
};
