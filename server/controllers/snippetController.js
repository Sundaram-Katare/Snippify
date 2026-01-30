// controllers/snippetController.js
import Snippet from "../models/snippetModel.js";
import User from "../models/userModel.js";

// @desc Create snippet
export const createSnippet = async (req, res) => {
  try {
    console.log(req.userId);
    const snippet = await Snippet.create({
      ...req.body,
      userId: req.userId,
    });

    // console.log("Created Snippet:", snippet);

    const user = await User.findById(req.userId);
    user.snippets.push(snippet._id);
    await user.save();

    res.status(200).json(snippet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSnippets = async (req, res) => {
  try {
    console.log(req.userId);
    const snippets = await Snippet.find({ userId: req.userId });
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
    res.json({ updated, message: "Snippet Updated successfully" });
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
