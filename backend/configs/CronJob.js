const cron = require("node-cron");
const User = require("../models/UserModel");


// Unfreeze users whose freezeUntil has passed
const unfreezeUsersJob = cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();
    const frozenUsers = await User.find({
      state: "frozen",
      freezeUntil: { $lte: now },
    });

    for (let user of frozenUsers) {
      user.state = "available";
      user.freezeUntil = null;
      await user.save();
    }

    console.log(
      `[CRON] Unfroze ${frozenUsers.length} user(s) at ${now.toISOString()}`
    );
  } catch (err) {
    console.error("[CRON ERROR] Failed to unfreeze users:", err.message);
  }
});

module.exports = {
  unfreezeUsersJob,
};
