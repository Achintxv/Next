import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({ msg: "No token provided" });
    }
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

export default protect;