import { prop, getModelForClass } from "@typegoose/typegoose";

class Block {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ default: () => new Date(Date.now() + 10 * 60 * 1000) })
  public timestamp?: Date;

  @prop({ default: true })
  public repeat!: boolean;

  @prop({ required: true })
  public userId!: string;
}

const BlockModel = getModelForClass(Block, {
  schemaOptions: {
    collection: "block",
    timestamps: true,
  },
});

export default BlockModel;
