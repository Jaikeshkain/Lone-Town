const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  user2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pinned: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt:{type:Date,default:Date.now},
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  messageCount: { type: Number, default: 0 },
  videoCallUnlocked: { type: Boolean, default: false },
});

const Match = mongoose.model("Match", matchSchema);
module.exports = Match;
