import express from "express"

import { createSlice, getAllSlice, deleteSlice, spinWheel } from "../controllers/wheel.controller.js"

const router = express.Router();

router.post('/', createSlice);
router.get("/", getAllSlice);
router.delete("/:id", deleteSlice);
router.get("/spin", spinWheel);

export default router;

