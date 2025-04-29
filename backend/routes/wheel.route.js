import express from "express"

import { createSlice, getAllSlice, deleteSlice, spinWheel } from "../controllers/wheel.controller.js"
import { isLogged } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin-only routes
router.post("/", isLogged, authorizeRoles("admin"), createSlice);
router.get("/", isLogged, authorizeRoles("user"), getAllSlice);
router.delete("/:id", isLogged, authorizeRoles("admin"), deleteSlice);

// Customer-only route
router.get("/spin", isLogged, authorizeRoles("user"), spinWheel);

export default router;

