// routes/snippetRoutes.js
import express from "express";
import {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet
} from "../controllers/snippetController.js";

const router = express.Router();

router.post("/", createSnippet);       // Create
router.get("/", getSnippets);          // Read all
router.get("/:id", getSnippetById);    // Read one
router.put("/:id", updateSnippet);     // Update
router.delete("/:id", deleteSnippet);  // Delete

export default router;
