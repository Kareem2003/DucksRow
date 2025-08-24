import express from "express";
import { PlaceController } from "../controllers/placeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, PlaceController.createPlace);
router.get("/", authMiddleware, PlaceController.getPlaces);
router.get("/:id", authMiddleware, PlaceController.getPlace);
router.put("/:id", authMiddleware, PlaceController.updatePlace);
router.delete("/:id", authMiddleware, PlaceController.deletePlace);

export default router;
