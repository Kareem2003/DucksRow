import prisma from "../models/prisma.js";

export const PlanController = {
  async createPlan(req, res) {
    try {
      const { title, city, startAt, budgetTotal, groupSize, isPublic } =
        req.body;

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
  },

  async getPlans(req, res) {
    try {
      const plans = await prisma.plan.findMany({
        where: { userId: req.user.id },
        include: { items: true },
      });

      res.json(plans);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching plans" });
    }
  },

  async getPlanById(req, res) {
    try {
      const { id } = req.params;
      const plan = await prisma.plan.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!plan || plan.userId !== req.user.id) {
        return res.status(404).json({ message: "Plan not found" });
      }

      res.json(plan);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching plan" });
    }
  },

  async updatePlan(req, res) {
    try {
      const { id } = req.params;
      const { title, city, startAt, budgetTotal, groupSize, isPublic } =
        req.body;

      // تأكد إن البلان بتاعت اليوزر
      const plan = await prisma.plan.findUnique({ where: { id } });
      if (!plan || plan.userId !== req.user.id) {
        return res.status(404).json({ message: "Plan not found" });
      }

      const updated = await prisma.plan.update({
        where: { id },
        data: {
          title,
          city,
          startAt: startAt ? new Date(startAt) : null,
          budgetTotal,
          groupSize,
          isPublic,
        },
      });

      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error updating plan" });
    }
  },

  async deletePlan(req, res) {
    try {
      const { id } = req.params;

      const plan = await prisma.plan.findUnique({ where: { id } });
      if (!plan || plan.userId !== req.user.id) {
        return res.status(404).json({ message: "Plan not found" });
      }

      await prisma.plan.delete({ where: { id } });
      res.json({ message: "Plan deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleting plan" });
    }
  },

  async addItem(req, res) {
    try {
      const { planId, placeId } = req.body;

      // 1- تأكد إن البلان موجود ومربوط باليوزر
      const plan = await prisma.plan.findUnique({ where: { id: planId } });
      if (!plan || plan.userId !== req.user.id) {
        return res.status(404).json({ message: "Plan not found" });
      }

      // 2- أنشئ PlanItem
      const planItem = await prisma.planItem.create({
        data: {
          planId,
          orderIndex: 0, // تقدر تخليها auto أو تخليها req.body لو عايز ترتيب
        },
      });

      // 3- اربط الـ Place بالـ PlanItem
      await prisma.planItemPlace.create({
        data: {
          planItemId: planItem.id,
          placeId,
        },
      });

      // 4- رجّع الرد
      const result = await prisma.planItem.findUnique({
        where: { id: planItem.id },
        include: {
          places: {
            include: { place: true },
          },
        },
      });

      res.status(201).json({
        id: result.id,
        planId: result.planId,
        orderIndex: result.orderIndex,
        expectedCostPP: result.expectedCostPP,
        expectedDuration: result.expectedDuration,
        arrivalTime: result.arrivalTime,
        notes: result.notes,
        places: result.places.map((pp) => pp.place),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error adding item to plan" });
    }
  },
};
