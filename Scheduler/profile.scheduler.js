const cron = require("node-cron");
const User = require("../Model/User.model");
const {
  getUpdatedFollower,
  getUpdatedFollowing,
  getUpdatedUserRepos,
  getUpdatedClosedCounts,
} = require("../Helpers/Job Helpers/profileJob.helper");

// Evening job schdduler

module.exports = {
  scheduleFollowerUpdateJob: async (userId) => {
    cron.schedule("0 0 * * *", async () => {
      await getUpdatedFollower(userId);
      await getUpdatedFollowing(userId);
      await getUpdatedUserRepos(userId);
      await getUpdatedClosedCounts(userId);
    });
  },
};
