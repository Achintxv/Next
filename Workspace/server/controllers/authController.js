import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";

// REGISTER
export const register = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    // console.log("REGISTER BODY:", req.body);

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashed = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashed,
    });

    res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};