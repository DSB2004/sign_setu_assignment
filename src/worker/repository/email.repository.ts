import { SendMailDTO } from "@/types/queue";
import nodemailer from "nodemailer";
import { getDB } from "@/lib/db";

import UserModel from "@/models/user.model";
import BlockModel from "@/models/block.model";

export class EmailRepository {
  private transporter: any;
  private APP_PASSWORD: string;
  private APP_EMAIL: string;

  constructor() {
    this.APP_EMAIL = process.env.APP_EMAIL as string;
    this.APP_PASSWORD = process.env.APP_PASSWORD as string;

    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: process.env.NODE_ENV === "production",
      auth: {
        user: this.APP_EMAIL,
        pass: this.APP_PASSWORD,
      },
    });
  }
  SendMail = async (data: SendMailDTO) => {
    const { email, subject, content } = data;
    try {
      await this.transporter.sendMail({
        from: `"Quiet Hours Team" <${this.APP_EMAIL}>`,
        to: email,
        subject: subject,
        html: content,
      });
      console.log("[EMAIL WORKER] Email sent successfully");
      return { success: true };
    } catch (err) {
      console.error("[EMAIL WORKER] Error while sending mail", err);
      return { success: false };
    }
  };

  RemainderMail = async () => {
    await getDB();
    const now = new Date();
    const next10 = new Date(now.getTime() + 10 * 60 * 1000);
    const prev10 = new Date(now.getTime() - 10 * 60 * 1000);
    const blocks = await BlockModel.find({
      active: true,
      timestamp: { $lte: next10 },
    });
    console.log("Found ", blocks.length);
    for (const block of blocks) {
      if (block.lastSent && block.lastSent > prev10) {
        continue;
        // to avoid the case when we have already sent the mail but still its under the 10 min window
      }
      const user = await UserModel.findById(block.userId);
      if (!user || !user.email) continue;

      await this.SendMail({
        email: user.email,
        subject: `Reminder: ${block.title}`,
        content: `<p>${block.description}</p>`,
      });

      block.lastSent = new Date();

      if (block.repeat) {
        block.timestamp = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }

      await block.save();
    }
  };
}
