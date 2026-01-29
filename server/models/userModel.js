// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  geminiApiKey: {
    type: String, // encrypted later
    select: false,
    default: ""
  },

  theme: {
    type: String,
    enum: ["light", "dark"],
    default: "light"
  },
  snippets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snippet" }],
}, { collection: "users" }, { timestamps: true });

export default mongoose.model("User", userSchema);