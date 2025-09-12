import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

class Block {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ default: () => new Date(Date.now() + 10 * 60 * 1000) })
  public timestamp?: Date;

  @prop()
  public lastSent?: Date;

  @prop({ default: true })
  public repeat!: boolean;

  @prop({ default: true })
  public active!: boolean;

  @prop({ required: true })
  public userId!: string;
}

const BlockModel =
  mongoose.models.Block ||
  getModelForClass(Block, {
    schemaOptions: {
      collection: "block",
      timestamps: true,
    },
  });

export default BlockModel;
