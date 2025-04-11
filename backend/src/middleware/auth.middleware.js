import  jwt from "jsonwebtoken";
import User from "../models/User.js";


export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(project = "-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Attach the user to the request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}