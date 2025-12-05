import prisma from "../models/prisma.js";

export const createPlace = async (req, res) => {
  try {
    const {
      name,
      description,
      priceLevel,
      avgPriceMin,
      avgPriceMax,
      phone,
      websiteUrl,
      instagramHandle,
      addressLine,
      city,
      country,
      geopoint,
      amenities,
      tags,
    } = req.body;

    const photos = req.files?.map((file) => ({
      url: file.path,
    }));

    const place = await prisma.place.create({
      data: {
        name,
        description,
        priceLevel,
        avgPriceMin: avgPriceMin ? parseInt(avgPriceMin) : null,
        avgPriceMax: avgPriceMax ? parseInt(avgPriceMax) : null,
        phone,
        websiteUrl,
        instagramHandle,
        addressLine,
        city,
        country,
        geopoint: geopoint ? JSON.parse(geopoint) : undefined,
        amenities: amenities ? JSON.parse(amenities) : undefined,
        tags: tags ? tags.split(",") : [],

        photos: {
          create: photos || [],
        },
      },
      include: { photos: true },
    });

    res.status(201).json(place);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const getPlaces = async (req, res) => {
  try {
    const places = await prisma.place.findMany();
    res.json(places);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPlace = async (req, res) => {
  try {
    const place = await prisma.place.findUnique({
      where: { id: req.params.id },
    });
    if (!place) return res.status(404).json({ error: "Place not found" });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const place = await prisma.place.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(place);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    await prisma.place.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Place deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
