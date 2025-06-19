const Match=require("../models/MatchModel")
const User=require("../models/UserModel")

// Simple scoring system for traits match
const calculateCompatibility = (userA, userB) => {
  let score = 0;

  if (userA.traits.introvertExtrovert === userB.traits.introvertExtrovert)
    score += 2;
  if (userA.traits.communicationStyle === userB.traits.communicationStyle)
    score += 2;
  if (userA.traits.decisionMaking === userB.traits.decisionMaking) score += 1;
  if (userA.traits.relationshipPace === userB.traits.relationshipPace)
    score += 1;
  if (userA.traits.conflictStyle === userB.traits.conflictStyle) score += 1;

  // Match values (intersect)
  const commonValues = userA.traits.values.filter((val) =>
    userB.traits.values.includes(val)
  );
  score += commonValues.length * 1; // 1 point per common value

  return score;
};

exports.findMatch = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user || user.state !== "available") {
      return res
        .status(400)
        .json({ message: "User is not available for matching." });
    }

    // Get all other available users
    const candidates = await User.find({
      _id: { $ne: userId },
      state: "available",
    });

    if (candidates.length === 0) {
      return res
        .status(404)
        .json({
          message:
            " Sorry 😞, No suitable candidates found. Please try again later or adjust your preferences.",
        });
    }

    // Score candidates
    const scored = candidates
      .map((candidate) => ({
        user: candidate,
        score: calculateCompatibility(user, candidate),
      }))
      .sort((a, b) => b.score - a.score);

    const bestMatch = scored[0]?.user;
    if (!bestMatch) {
      return res.status(404).json({ message: "No compatible match found." });
    }

    // Create Match
    const match = await Match.create({
      user1: user._id,
      user2: bestMatch._id,
    });

    // Update both users
    user.state = "matched";
    user.currentMatch = match._id;
    await user.save();

    bestMatch.state = "matched";
    bestMatch.currentMatch = match._id;
    await bestMatch.save();

    res.status(200).json({
      message: "Match found successfully!",
      matchId: match._id,
      partner: {
        id: bestMatch._id,
        name: bestMatch.name,
        traits: bestMatch.traits,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
