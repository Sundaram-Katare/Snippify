// routes/snippetRoutes.js
import express from "express";
import {
  createSnippet,
  getSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  updateCode,
  explainCode
} from "../controllers/snippetController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createSnippet);       // Create
router.get("/", auth, getSnippets);          // Read all
router.get("/:id", auth, getSnippetById);    // Read one
router.put("/:id", auth, updateSnippet);     // Update
router.delete("/:id", auth, deleteSnippet);  // Delete
router.patch('/:id', auth, updateCode);
router.post("/explain/:id", auth, explainCode);
export default router;
