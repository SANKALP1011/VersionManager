const User = require("../../Model/User.model");
const {
  getUpdatedFollowerCount,
} = require("../../Github Service/profile.service");

module.exports = {
  getUpdatedFollower: async (userId) => {
    try {
      const user = await User.findById(userId);
      const response = await getUpdatedFollowerCount(user.GithubUserName);
      const newFollowerCount = response.length;

      let increaseOrDecrease;
      if (newFollowerCount > user.GiHubFollowres) {
        increaseOrDecrease = "increase";
      } else if (newFollowerCount < user.GiHubFollowres) {
        increaseOrDecrease = "decrease";
      } else {
        increaseOrDecrease = "no_change";
      }
      await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            GiHubFollowres: newFollowerCount,
          },
        },
        {
          $new: true,
        }
      );
      return {
        followerCount: newFollowerCount,
        increaseOrDecrease: increaseOrDecrease,
      };
    } catch (err) {
      console.log(err);
    }
  },
};
