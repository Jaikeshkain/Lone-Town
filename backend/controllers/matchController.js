const Match = require("../models/MatchModel");
const User = require("../models/UserModel");

//calculate compatibility
const calculateCompatibility=(userA,userB)=>{
    let score=0
    if (userA.traits.introvertExtrovert === userB.traits.introvertExtrovert)
      score += 2;
    if (userA.traits.communicationStyle === userB.traits.communicationStyle)
      score += 2;
    if (userA.traits.decisionMaking === userB.traits.decisionMaking) score += 1;
    if (userA.traits.relationshipPace === userB.traits.relationshipPace)
      score += 1;
    if (userA.traits.conflictStyle === userB.traits.conflictStyle) score += 1;

    //matching values
    const commonValues=userA.traits.values.filter((val)=>userB.traits.values.includes(val))
    score=commonValues.length*1//one point per common value

    return score
}

exports.findMatch=async(req,res)=>{
    try {

        const userId=req.user.id
        //check user is available for match
        const user=await User.findById(userId)
        if(!user || user.state !=="available"){
            return res.status(401).json({message:"User is not available for match"})
        }
        //get all other available users
        const candidates=await User.find({_id:{$ne:userId},state:"available"})
        if(!candidates){
            return res.status(401).json({message:"No Match available for match"})
        }
        //scored candidates
        const scoredCandidates=candidates.map((candidate)=>({
            user:candidate,
            score : calculateCompatibility(user,candidate)
        })).sort((a,b)=>b.score-a.score)
        //select best match
        const bestMatch=scoredCandidates[0]?.user
        if (!bestMatch) {
            return res.status(404).json({ message: "No compatible match found." });
        }
        //create match
        const match=await Match.create({
            user1:user._id,
            user2:bestMatch._id
        })
        //update both users
        user.state="matched"
        user.currentMatch=match._id
        await user.save()

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
    } catch (error) {
       console.error(err);
       res.status(500).json({ message: "Server error", error: err.message });
    }
}