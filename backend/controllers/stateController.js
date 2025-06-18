const Match = require("../models/MatchModel");
const User = require("../models/UserModel")

//update userState ro available
exports.getUserState=async(req,res)=>{
    try {
        const {id}=req.user
        const user=await User.findById(id);
        if(!user){
            return res.status(401).json({message:"User not Found"})
        }
        //set freeze to available
        if(user.state==="frozen" && user.freezeUntil && Date.now()>user.freezeUntil){
            user.state="available"
            user.freezeUntil=null
            await user.save()
        }
        res.status(200).json({
          state: user.state,
          freezeUntil: user.freezeUntil,
          currentMatch: user.currentMatch,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

//frozen the account if unpin
exports.unpinMatch = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user || !user.currentMatch) {
      return res.status(400).json({ message: "No match to unpin." });
    }

    const matchId = user.currentMatch; // Store before nulling it

    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: "Match not found." });
    }

    // Get the other user's ID
    const otherUserId = match.user1.equals(userId) ? match.user2 : match.user1;
    const otherUser = await User.findById(otherUserId);

    // 1. Freeze current user
    user.state = "frozen";
    user.freezeUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    user.currentMatch = null;
    await user.save();

    // 2. Set 2h delay for other user to be available again
    if (otherUser) {
      otherUser.currentMatch = null;
      otherUser.state = "frozen";
      otherUser.freezeUntil = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
      await otherUser.save();
    }

    // 3. Update match status
    match.pinned = false; // Optional: if using pinned field
    match.updatedAt = new Date();
    await match.save();

    res.status(200).json({ message: "Matched user unpinned successfully." });
  } catch (error) {
    console.error("Unpin Error:", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
