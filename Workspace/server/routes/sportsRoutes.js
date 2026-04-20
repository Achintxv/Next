import express from "express";
import { cricketLive } from "../controllers/sportsController.js";

const router = express.Router();

router.get("/cricket", cricketLive);

export default router;