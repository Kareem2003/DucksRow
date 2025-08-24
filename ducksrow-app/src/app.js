import express from "express";
import passport from "passport";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import "./config/passport.js";

const app = express();

app.use(express.json());
app.use(
  session({ secret: "keyboard cat", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/plans", planRoutes);

export default app;
