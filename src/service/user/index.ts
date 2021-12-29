import { isValidObjectId } from "mongoose";
// import { phoneRegex } from "../../config/regex";
import User, { UserSchemaType } from "./user.model";
import { registerInput } from "./user.dtos";
import logging from "../../config/logging";
const NAMESPACE = "user/service";
export const findUser = async (id: string): Promise<UserSchemaType> => {
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
export const findUserKakao = async (id: string): Promise<UserSchemaType> => {
  try {
    const user = await User.findOne({ "sns.type": "kakao", "sns.id": id });
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
export const createUser = async ({
  id: userId,
  name,
  password,
  phone,
}: registerInput) => {
  const data = { userId, name, password, phone };
  try {
    if (typeof data.name !== "string") {
      throw {
        status: 400,
        message: "invalid name params",
      };
    }
    const user = new User({
      ...data,
      sns: { snsType: "kakao", id: "00000000" },
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

export const findUserbyId = async (
  userId: string,
): Promise<UserSchemaType | null> => {
  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const addGameToUser = async ({
  userId,
  game: { id: gameId, name },
  gameUser: { id, nickname },
}: {
  userId: string;
  game: {
    id: string;
    name: string;
  };
  gameUser: {
    id: string;
    nickname: string;
  };
}): Promise<UserSchemaType | null> => {
  try {
    const date = new Date();
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          games: {
            _id: gameId,
            gameName: name,
            gameUser: {
              _id: id,
              nickname,
            },
            win: 0,
            lose: 0,
            rating: 1000,
            updatedAt: date,
          },
        },
      },
      {
        useFindAndModify: false,
        new: true,
      },
    );
    if (!user) {
      throw {
        status: 500,
        message: "db error",
      };
    }
    return user;
  } catch (err) {
    throw err;
  }
};
