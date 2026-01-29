// models/Snippet.js
import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  title: { type: String, required: true },
  description: String,
  language: { type: String, required: true },
  code: { type: String, required: true },

  status: {
    type: String,
    enum: ["IDEA", "IN_PROGRESS", "READY", "ARCHIVED"],
    default: "IDEA"
  },

  tags: [String],
  isPinned: { type: Boolean, default: false }
}, { collection: "snippets" }, { timestamps: true });

export default mongoose.model("Snippet", snippetSchema);