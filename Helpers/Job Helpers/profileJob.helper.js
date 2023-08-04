const User = require("../../Model/User.model");
const {
  getUpdatedFollowerCount,
  getUpdatedFollowingCount,
} = require("../../Github Service/profile.service");
const { UserNotFoundError } = require("../../Errors/userAuth.error");
const {
  FailedToFetchGithubFollowersCounts,
  FailedToFetchGithubFollowingCounts,
} = require("../../Errors/githubApi.error");

module.exports = {
  getUpdatedFollower: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does nit exists in our database"
        );
      }
      const response = await getUpdatedFollowerCount(user.GithubUserName);
      if (!Array.isArray(response)) {
        throw new FailedToFetchGithubFollowersCounts(
          "Unable to fetch the githu  follower count"
        );
      }
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
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFetchGithubFollowersCounts
      ) {
        return err;
      }
    }
  },
  getUpdatedFollowing: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      const response = await getUpdatedFollowingCount(user.GithubUserName);
      if (!Array.isArray(response)) {
        throw new FailedToFetchGithubFollowingCounts(
          `Unable to fetch the following count for user ${user.GithubUserName}`
        );
      }
      const newFollowingCount = response.length;
      let increaseOrDecrease;
      if (user.GitHubFollowing > newFollowingCount) {
        increaseOrDecrease = "decrease";
      } else if (user.GitHubFollowing < newFollowingCount) {
        increaseOrDecrease = "increase";
      } else {
        increaseOrDecrease = "no_change";
      }
      await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            GitHubFollowing: newFollowingCount,
          },
        },
        {
          $new: true,
        }
      );
      return {
        followingCount: newFollowingCount,
        increaseOrDecrease: increaseOrDecrease,
      };
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFetchGithubFollowingCounts
      ) {
        return err;
      }
    }
  },
};
