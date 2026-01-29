// controllers/snippetController.js
import Snippet from "../models/snippetModel.js";

// @desc Create snippet
export const createSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.create(req.body);
    res.status(201).json(snippet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Get all snippets
export const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Get single snippet
export const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) return res.status(404).json({ error: "Snippet not found" });
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc Update snippet
export const updateSnippet = async (req, res) => {
  try {
    const updated = await Snippet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Snippet not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc Delete snippet
export const deleteSnippet = async (req, res) => {
  try {
    const deleted = await Snippet.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Snippet not found" });
    res.json({ message: "Snippet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
