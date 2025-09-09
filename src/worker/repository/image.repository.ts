import { UploadAvatarWorkerDTO } from "@/types/queue";
import ImageKit from "imagekit";
import fs from "fs";
import { getDB } from "@/lib/db";
import { ObjectId } from "mongoose";
import UserModel from "@/models/user.model";
export class ImageRepository {
  private imagekit: ImageKit;
  private PUBLIC_KEY = process.env.PUBLIC_KEY as string;
  private PRIVATE_KEY = process.env.PRIVATE_KEY as string;
  private URL = process.env.URL as string;
  constructor() {
    this.imagekit = new ImageKit({
      publicKey: this.PUBLIC_KEY,
      privateKey: this.PRIVATE_KEY,
      urlEndpoint: this.URL,
    });
  }
  async uploadFile({
    file,
    filename,
    userId,
  }: UploadAvatarWorkerDTO): Promise<any> {
    try {
      const content = fs.readFileSync(file);
      console.log("[IMAGE WORKER] ", "Processing", file);
      await fs.promises.unlink(file);
      const result = await this.imagekit.upload({
        file: content,
        fileName: filename,
      });

      await getDB();

      const user = await UserModel.findById(userId);
      if (!user) {
        console.warn(`[IMAGE WORKER] User ${userId} not found`);
        return false;
      }
      user.avatar = result.url;
      await user.save();
      console.log(`[IMAGE WORKER] User ${userId} iamge updated`);
      return true;
    } catch (error) {
      console.log(`[IMAGE WORKER] Failed to updated user avatar`);
      return false;
    }
  }
}
