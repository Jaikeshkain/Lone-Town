const Message = require("../models/MessageModel");


    exports.getMessagesByMatch = async (req, res) => {
      const { matchId } = req.params;
      console.log("matchId",matchId)
      try {
        const messages = await Message.find({ matchId })
          .sort({ sentAt: 1 }) // oldest first
          .lean();

        res.status(200).json({ messages });
      } catch (err) {
        console.error("Get Messages Error:", err);
        res.status(500).json({ message: "Failed to load messages." });
      }
    };
