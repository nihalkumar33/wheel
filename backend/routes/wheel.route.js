import express from "express"

import { createSlice, getAllSlice, deleteSlice } from "../controllers/wheel.controller.js"

const router = express.Router();

router.post('/', createSlice);
router.get("/", getAllSlice);
router.delete("/:id", deleteSlice);

export default router;

