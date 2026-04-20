import express from "express";
import { handleAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/", handleAI);

export default router;