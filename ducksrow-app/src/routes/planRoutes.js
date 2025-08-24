import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { PlanController } from "../controllers/planController.js";

const router = express.Router();

// Protected routes
router.post("/", authMiddleware, PlanController.createPlan);
router.get("/", authMiddleware, PlanController.getPlans);
router.get("/:id", authMiddleware, PlanController.getPlanById);
router.put("/:id", authMiddleware, PlanController.updatePlan);
router.delete("/:id", authMiddleware, PlanController.deletePlan);
router.post("/item", authMiddleware, PlanController.addItem);

export default router;
