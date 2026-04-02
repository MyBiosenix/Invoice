import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UserModel } from "../models/UserModel.js";
import { sendError, sendSuccess } from "../utils/apiResponse.js";

const buildAuthPayload = (user) => ({
  token: jwt.sign({ Id: user.userId, role: user.userType }, env.jwtSecret),
  role: user.userType,
  name: user.userName,
  permission: user.permission,
});

export const register = async (req, res) => {
  try {
    const { userName, userId, password, companyName, permission, state } = req.body;

    if (!userName || !userId || !password || !companyName || !permission || !state) {
      return sendError(res, {
        statusCode: 400,
        message: "All required fields must be provided",
      });
    }

    const existingUser = await UserModel.findOne({ userId });

    if (existingUser) {
      return sendError(res, {
        statusCode: 409,
        message: "User already exists",
      });
    }

    const newUser = await UserModel.create({
      userName,
      userId,
      password,
      companyName: companyName.toLowerCase(),
      permission,
      state,
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: "User registered successfully",
      data: buildAuthPayload(newUser),
    });
  } catch (error) {
    return sendError(res, {
      statusCode: 500,
      message: "Unable to register user",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return sendError(res, {
        statusCode: 400,
        message: "User ID and password are required",
      });
    }

    const user = await UserModel.findOne({ userId });

    if (!user) {
      return sendError(res, {
        statusCode: 401,
        message: "Invalid user ID or password",
      });
    }

    if (user.password !== password) {
      return sendError(res, {
        statusCode: 401,
        message: "Invalid user ID or password",
      });
    }

    return sendSuccess(res, {
      message: "Login successful",
      data: buildAuthPayload(user),
    });
  } catch (error) {
    return sendError(res, {
      statusCode: 500,
      message: "Unable to login right now",
    });
  }
};

export const alluser = async (req, res) => {
  try {
    const user = await UserModel.find().sort({ _id: -1 });

    return sendSuccess(res, {
      message: "Users fetched successfully",
      data: { user },
    });
  } catch (error) {
    return sendError(res, {
      statusCode: 500,
      message: "Unable to fetch users",
    });
  }
};
  
  


//---------------------------------- chanmging password --------------------------
export const changePassword = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return sendError(res, {
        statusCode: 400,
        message: "User ID and password are required",
      });
    }

    const user = await UserModel.findOneAndUpdate(
      { userId },
      { password },
      { new: true }
    );

    if (!user) {
      return sendError(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    return sendSuccess(res, {
      message: "Password updated successfully",
      data: { user },
    });
  } catch (error) {
    return sendError(res, {
      statusCode: 500,
      message: "Unable to update password",
    });
  }
};

 //-------------------- delete user ----------------

export const passwordDelete = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findOneAndDelete({ userId });

    if (!user) {
      return sendError(res, {
        statusCode: 404,
        message: "User not found",
      });
    }

    return sendSuccess(res, {
      message: "User deleted successfully",
    });
  } catch (error) {
    return sendError(res, {
      statusCode: 500,
      message: "Unable to delete user",
    });
  }
};
