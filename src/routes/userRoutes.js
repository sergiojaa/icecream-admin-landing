import express from "express";

import { signUp, signIn } from "../controller/authController.js";
import { getUsers } from "../controller/userController.js";
const router = express.Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/", getUsers);
export default router;
