import { Router } from "express";
import { getUser, registerUser } from "../controllers/user.controllers.js";
import { loginUser } from "../controllers/user.controllers.js";
import { userAuth } from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.route("/profile").get(userAuth, getUser);
router.route("/forgot-password").post(getUser);
router.route("/reset-password/:id/:token").post(userAuth);
export default router;
