const asyncHandler = require("express-async-handler");
const users = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new error("this is required");
  }
  const userAvailable = await users.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await users.create({
    username,
    email,
    password: hashPassword,
  });
  if (newUser) {
    res.status(201).json({ message: "New user created" });
  } else {
    res.status(400).json({ message: "New user not created, Please try again" });
  }

  res.status(200).json(newUser);
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401);
    throw new Error("Invalid login credential");
  }
  const userDetails = await users.findOne({ email });

  if (userDetails && (await bcrypt.compare(password, userDetails.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: userDetails.username,
          email: userDetails.email,
          id: userDetails.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid login credential");
  }
  res.status(200).json(userDetails);
});
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
