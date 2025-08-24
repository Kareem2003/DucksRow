import prisma from "../models/prisma.js";

export const PlaceController = {
  async createPlace(req, res) {
    try {
      const place = await prisma.place.create({
        data: req.body,
      });
      res.status(201).json(place);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },

  async getPlaces(req, res) {
    try {
      const places = await prisma.place.findMany();
      res.json(places);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getPlace(req, res) {
    try {
      const place = await prisma.place.findUnique({
        where: { id: req.params.id },
      });
      if (!place) return res.status(404).json({ error: "Place not found" });
      res.json(place);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updatePlace(req, res) {
    try {
      const place = await prisma.place.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json(place);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async deletePlace(req, res) {
    try {
      await prisma.place.delete({
        where: { id: req.params.id },
      });
      res.json({ message: "Place deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
