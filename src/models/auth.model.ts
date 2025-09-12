import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";
class Auth {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ default: false })
  public verified!: boolean;
}

const AuthModel =
  mongoose.models.Auth ||
  getModelForClass(Auth, {
    schemaOptions: {
      collection: "auth",
      timestamps: true,
    },
  });
export default AuthModel;
