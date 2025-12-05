import express from "express";
import {
  createPlace,
  deletePlace,
  getPlace,
  getPlaces,
  updatePlace,
} from "../controllers/placeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Protected routes
router.post("/", upload.array("photos", 5), authMiddleware, createPlace);
router.get("/", authMiddleware, getPlaces);
router.get("/:id", authMiddleware, getPlace);
router.put("/:id", authMiddleware, updatePlace);
router.delete("/:id", authMiddleware, deletePlace);

export default router;
