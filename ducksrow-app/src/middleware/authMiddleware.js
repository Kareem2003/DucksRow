import jwt from "jsonwebtoken";
import prisma from "../models/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader?.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { providers: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("AuthMiddleware error:", err);
    return res.status(500).json({ message: "Server error in auth middleware" });
  }
};
