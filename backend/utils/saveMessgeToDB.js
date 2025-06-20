const Message = require("../models/MessageModel");
const Match = require("../models/MatchModel");

const saveMessageToDB = async ({ matchId, senderId, message }) => {
  const saved = await Message.create({ matchId, senderId, message });

  const match = await Match.findById(matchId);
  if (match) {
    match.messageCount += 1;
    match.messages=[saved._id]
    if (match.messageCount >= 100 && !match.videoCallUnlocked) {
      match.videoCallUnlocked = true;
    }
    await match.save();
  }

  return saved;
};

module.exports = saveMessageToDB;
