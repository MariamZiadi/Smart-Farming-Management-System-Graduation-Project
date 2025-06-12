import express from "express";
import Plant from "../models/plant_arabic";

const router = express.Router();

// Get all plants
router.get("/", async (req, res) => {
    try {
        const plant_arabics = await Plant.find();
        res.json(plant_arabics);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch plants" });
    }
});

// Get single plant by ID
router.get("/:id", async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (plant) {
            res.json(plant);
        } else {
            res.status(404).json({ error: "Plant not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error fetching plant" });
    }
});

// Create new plant
router.post("/", async (req, res) => {
    try {
        const { name, wateringPlan, fertilizerPlan } = req.body;
        const newPlant = new Plant({ name, wateringPlan, fertilizerPlan });
        await newPlant.save();
        res.status(201).json(newPlant);
    } catch (err) {
        res.status(500).json({ error: "Failed to create plant" });
    }
});

export default router;
