import express from "express";
import {
  signup,
  login,
  getCurrentUser,
} from "../controllers/userController.js";
import {
  validateLogin,
  validateSignup,
} from "../middleware/validationMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import passport from "passport";
import "../config/passport.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.send("Google Login Success 🎉");
  }
);

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.get("/me", authMiddleware, getCurrentUser);

export default router;
