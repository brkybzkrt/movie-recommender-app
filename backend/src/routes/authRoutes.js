import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

router.post("/login", async(req, res) => {
try {
  const { username, email, password } = req.body;
  if ((!username && !email) || !password) {

    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = generateToken(user._id);
  res.status(200).json({ token, user: { _id: user._id, username: user.username, email: user.email, profilePicture: user.profilePicture } });  
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  
});


router.post("/register", async (req, res) => {
  try {
    const { username,email, password } = req.body;
    
    if(!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if(password.length < process.env.PASSWORD_MIN_LENGTH) {
      return res.status(400).json({ message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long` });
    }

    // Check if user already exists

   const existsUser= await User.findOne({$or: [{ username}, {email }] });
      

    if (existsUser) return res.status(400).json({ message: "User already exists" });
    
    const user = new User({
      username,
      email,
      password,
      profilePicture:`https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${username}`,
    });

    await user.save();
    const token = generateToken(user._id);
    res.status(201).json({ token, user: { _id: user._id, username: user.username, email: user.email, profilePicture: user.profilePicture } });

  } catch (error) {
    console.error(error);
    res.status(500).json(error.message? { message: error.message } : { message: "Internal server error" });
    
  }
});


export default router;