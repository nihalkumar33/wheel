import express from "express";
import { registeredUser, login, getProfile ,logout} from "../controllers/auth.controller.js";
import { isLogged } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registeredUser);
router.post("/login", login);
router.get("/getProfile",isLogged, getProfile);
router.get("/logout",isLogged, logout);

// router.get("/verify/:token", verifyUser);
// router.put("/updateProfile", isLogged,updateProfile);

// router.post("/forgotPassword", forgotPassword);
// router.post("/resetPassword/:resetToken", resetPassword);

export default router;