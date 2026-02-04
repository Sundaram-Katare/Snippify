import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfile = async (req, res) => {
  try {
     const userId = req.userId;
    //  console.log(userId);
     const user = await User.findById(userId);

    //  console.log(user);

     if(!user) {
      return res.status(400).json({ message: "User not exist" });
     }

     return res.status(200).json({ message: "Profile fetched successfully", user: user});
  } catch (err) {
    return res.status(500).json({ message: "Internal server eror", err: err.message })
  }
};

export const switchTheme = async (req, res) => {
  try {
    const userId = req.userId;

    const userDoc = await User.findById(userId);
    if (!userDoc) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const newTheme = userDoc.theme === "light" ? "dark" : "light";

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { theme: newTheme },
      { new: true }
    );

    return res.status(200).json({ user: updatedUser });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const setApiKey = async (req, res) => {
  try {
    const userId = req.userId;

    const {apiKey} = req.body;

    const user = await User.findByIdAndUpdate(userId,{ geminiApiKey: apiKey}, { new: true });

    return res.status(200).json({ message: "Updated API Key", user});
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
