import { Schema, Types, model } from "mongoose";

export interface UserSchemaType extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  userType: string; //유 무료? 필요없으면 나중에 없애자 비엠 개인에게 안넣으려 하니/..
  isDeleted: boolean;
  isRested: boolean;
  group: any[]; //아직 그룹은 추후에
}
const UserSchema = new Schema<UserSchemaType>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    userType: { type: String, default: "normal" },
    isDeleted: { type: Boolean, default: false },
    isRested: { type: Boolean, default: false },
    group: [],
  },
  { timestamps: true },
);
const User = model<UserSchemaType>("user", UserSchema);
export default User;
