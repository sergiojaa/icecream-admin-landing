import express from "express";
import { getIceCreams } from "../controllers/iceCreamController.js";

const router = express.Router();
router.get("/", getIceCreams);
