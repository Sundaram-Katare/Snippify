import Snippet from "../models/snippetModel.js";
import User from "../models/userModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";


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

export const updateCode = async (req, res) => {
  try {
    const { code } = req.body;
    const updated = await Snippet.findByIdAndUpdate(req.params.id, { code }, { new: true });
    if (!updated) return res.status(404).json({ error: "Snippet not found" });
    res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const explainCode = async (req, res) => {
  try {
    const userId = req.userId;

    // Get user's Gemini API key
    const user = await User.findById(userId);

    const code = req.params.id ? (await Snippet.findById(req.params.id)).code : req.body.code;
    
    if (!user || !user.geminiApiKey || user.geminiApiKey === "key") {
      return res.status(400).json({ 
        error: "Please Add Gemini API Key",
        code: "NO_API_KEY"
      });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(user.geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create the prompt
    const prompt = `Explain the following code in 5-6 bullet points. Be concise and clear:

\`\`\`
${code}
\`\`\`

Provide the explanation in a JSON format like this:
{
  "explanation": ["point 1", "point 2", "point 3", "point 4", "point 5"]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: "Failed to parse API response" });
    }

    const explanation = JSON.parse(jsonMatch[0]);

    res.status(200).json({ 
      explanation: explanation.explanation,
      message: "Code explained successfully"
    });

  } catch (err) {
    console.error("Error explaining code:", err);
    
    // Check for API key expiration or invalid key
    if (err.message.includes("API key") || err.message.includes("403")) {
      return res.status(401).json({ 
        error: "Gemini API key is expired, Please add another key",
        code: "EXPIRED_API_KEY"
      });
    }

    res.status(500).json({ 
      error: err.message || "Failed to explain code"
    });
  }
};