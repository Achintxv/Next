import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createIdea,
  getIdeas,
  updateIdea,
  deleteIdea,
} from "../controllers/ideaController.js";

const router = express.Router();

router.get("/", protect, getIdeas);
router.post("/", protect, createIdea);
router.put("/:id", protect, updateIdea);
router.delete("/:id", protect, deleteIdea);

export default router;