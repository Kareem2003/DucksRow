import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addPlaceToPlan,
  createPlan,
  deletePlan,
  getPlanById,
  getPlans,
  removePlaceFromPlan,
  updatePlan,
} from "../controllers/planController.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, createPlan);
router.get("/", authMiddleware, getPlans);
router.get("/:id", authMiddleware, getPlanById);
router.put("/:id", authMiddleware, updatePlan);
router.delete("/:id", authMiddleware, deletePlan);

router.post("/place", authMiddleware, addPlaceToPlan);
router.delete("/place", authMiddleware, removePlaceFromPlan);

export default router;
