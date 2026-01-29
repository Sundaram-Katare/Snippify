// models/snippetModel.js
import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  language: { type: String, required: true },
  code: { type: String, required: true },
}, { collection: "snippets" }, { timestamps: true });

export default mongoose.model("Snippet", snippetSchema);
    