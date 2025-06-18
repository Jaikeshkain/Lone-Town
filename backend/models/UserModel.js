const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    traits: {
      introvertExtrovert: String,
      decisionMaking: String,
      conflictStyle: String,
      communicationStyle: String,
      relationshipPace: String,
      values: [String]
    },
    currentMatch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      default: null,
    },
    freezeUntil: Date,
    state: {
      type: String,
      enum: ["available", "matched", "frozen"],
      default: "available",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
