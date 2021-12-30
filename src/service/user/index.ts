import { isValidObjectId } from "mongoose";
// import { phoneRegex } from "../../config/regex";
import User, { UserSchemaType } from "./user.model";
import { registerInput } from "./user.dtos";
import logging from "../../config/logging";
const NAMESPACE = "user/service";
export const findUserById = async (id: string): Promise<UserSchemaType> => {
  try {
    if (!isValidObjectId(id)) {
      throw {
        status: 400,
        message: "invalid User id",
      };
    }
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw {
        status: 201,
        message: "user doesn't exist",
      };
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const findUserbyEmail = async (
  email: string,
): Promise<UserSchemaType | null> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const createUser = async ({ email, name, password }: registerInput) => {
  const data = { email, name, password };
  try {
    if (typeof data.name !== "string") {
      throw {
        status: 400,
        message: "invalid name params",
      };
    }
    const user = new User({
      ...data,
    });
    await user.save();
    return user;
  } catch (err) {
    // console.log(error);
    const error = err as any;
    logging.error(NAMESPACE, error.message);
    throw error;
  }
};
