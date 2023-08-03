const cron = require("node-cron");
const User = require("../Model/User.model");
const {
  getUpdatedFollowerandFollowing,
} = require("../Helpers/Job Helpers/profileJob.helper");

module.exports = {
  scheduleFollowerUpdateJob: async (userId) => {
    cron.schedule("0 0 * * *", async () => {
      await getUpdatedFollowerandFollowing(userId);
    });
  },
};
