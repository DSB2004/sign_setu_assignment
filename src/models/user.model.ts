import { prop, getModelForClass, mongoose } from "@typegoose/typegoose";

class User {
  @prop({ required: true, unique: true })
  public authId!: string;

  @prop({ required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
  public email!: string;

  @prop({ required: true })
  public username!: string;

  @prop({})
  public avatar?: string;

  @prop({})
  public bio?: string;
}

const UserModel =
  (mongoose.models.User as ReturnType<typeof getModelForClass<typeof User>>) ||
  getModelForClass(User, {
    schemaOptions: {
      collection: "user",
      timestamps: true,
      toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_, ret) => {
          ret.id = ret._id.toString();
          delete ret._id;
        },
      },
    },
  });

export default UserModel;
