import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { apiError } from "../../../../backend/backend/src/utils/apiError.js";
import { User } from "../models/user.model.js";
import { apiResponse } from "../utils/ApiResponse.js";
import sendMail from "../utils/sendMail.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    throw new apiError(400, "All fields are required");
  }

  const foundedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (foundedUser) throw new apiError(409, "User Already existed");
  const user = await User.create({
    username,
    // avatar: avatar,
    // coverImage: coverImage,
    email,
    password,
  });
  const token = jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
    })
    .json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
});

export { registerUser };

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ((!username && !email) || !password)
    throw new apiError(400, "Please Enter All required fields");

  const foundeduser = await User.findOne({ $or: [{ username }, { email }] });
  if (!foundeduser) throw new apiError(404, "User Does not exist");

  const isValid = await foundeduser.IsPasswordCorrect(password);

  if (!isValid) throw new apiError(401, "Password is not correct");
  const token = jwt.sign(
    {
      id: foundeduser._id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );

  res
    .status(201)
    .cookie("token", token, { httpOnly: true, secure: false })
    .json({
      success: true,
      message: "user is logged in",
      user: {
        id: foundeduser._id,
        username: foundeduser.username,
        email: foundeduser.email,
      },
    });
});

export { loginUser };

const getUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new apiError(404, "user not found");
  }
  if (user) console.log(user.email);
  const userId = user._id;
  if (userId) console.log(userId);

  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  try {
    await sendMail({
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      from: process.env.SMTP_FROM,
      to: user.email,
      subject: "Password Reset",
      message: `:http://localhost:5173/reset-password/${userId}/${token}`,
    });
    res.status(200).json(new apiResponse(200, "message sended", user));
  } catch (error) {
    throw new apiError(403, "email isnt sended");
  }
});

export { getUser };

const userAuth = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  if (!token || !id) throw new apiError(401, "there is no token or id");
  if (!password) throw new apiError(401, "there is no password");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (verified.id !== id) throw new apiError(402, "token is invalid");
    const user = await User.findById(id);
    user.password = password;
    await user.save();
    res.status(200).json(new apiResponse("password updated succesfully"));
  } catch (error) {
    throw new apiError(403, "You Are not authorized");
  }
});

export { userAuth };
