import prisma from "../models/prisma.js";

export const createPlan = async (req, res) => {
  try {
    const { title, city, startAt, budgetTotal, groupSize, isPublic } = req.body;

    const plan = await prisma.plan.create({
      data: {
        title,
        city,
        startAt: startAt ? new Date(startAt) : null,
        budgetTotal,
        groupSize,
        isPublic,
        userId: req.user.id,
      },
    });

    res.status(201).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating plan" });
  }
};

export const getPlans = async (req, res) => {
  try {
    const plans = await prisma.plan.findMany({
      where: { userId: req.user.id }, 
      include: { places: true },
    });

    res.json(plans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching plans" });
  }
};

export const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await prisma.plan.findFirst({
      where: { id, userId: req.user.id }, 
      include: { places: true },
    });

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching plan" });
  }
};

export const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, city, startAt, budgetTotal, groupSize, isPublic } = req.body;

    const updated = await prisma.plan.updateMany({
      where: { id, userId: req.user.id },
      data: {
        title,
        city,
        startAt: startAt ? new Date(startAt) : null,
        budgetTotal,
        groupSize,
        isPublic,
      },
    });

    if (updated.count === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const plan = await prisma.plan.findFirst({
      where: { id, userId: req.user.id },
      include: { places: true },
    });

    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating plan" });
  }
};

export const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await prisma.plan.deleteMany({
      where: { id, userId: req.user.id },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json({ message: "Plan deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting plan" });
  }
};

export const addPlaceToPlan = async (req, res) => {
  try {
    const { planId, placeId } = req.body;

    const plan = await prisma.plan.findFirst({
      where: { id: planId, userId: req.user.id }, 
    });
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const updatedPlan = await prisma.plan.update({
      where: { id: planId },
      data: {
        places: {
          connect: { id: placeId },
        },
      },
      include: { places: true },
    });

    res.status(201).json(updatedPlan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding place to plan" });
  }
};

export const removePlaceFromPlan = async (req, res) => {
  try {
    const { planId, placeId } = req.body;

    const plan = await prisma.plan.findFirst({
      where: { id: planId, userId: req.user.id }, 
    });
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const updatedPlan = await prisma.plan.update({
      where: { id: planId },
      data: {
        places: {
          disconnect: { id: placeId },
        },
      },
      include: { places: true },
    });

    res.json(updatedPlan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing place from plan" });
  }
};
