import express from "express";

import { signUp } from "../controller/authController.js";
import { getUsers } from "../controller/userController.js";
const router = express.Router();
router.post("/signup", signUp);
router.get("/", getUsers);
export default router;
