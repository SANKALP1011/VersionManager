const cron = require("node-cron");
const User = require("../Model/User.model");
const {
  getUpdatedFollower,
  getUpdatedFollowing,
  getUpdatedUserRepos,
} = require("../Helpers/Job Helpers/profileJob.helper");

module.exports = {
  scheduleFollowerUpdateJob: async (userId) => {
    cron.schedule("0 0 * * *", async () => {
      await getUpdatedFollower(userId);
      await getUpdatedFollowing(userId);
      await getUpdatedUserRepos(userId);
    });
  },
};
