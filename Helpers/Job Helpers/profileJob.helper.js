const User = require("../../Model/User.model");
const Repository = require("../../Model/UserRepo.Model");
const {
  getUpdatedFollowerCount,
  getUpdatedFollowingCount,
} = require("../../Github Service/profile.service");
const {
  getUserRepo,
  getRepostoryIssues,
} = require("../../Github Service/repo.service");
const { UserNotFoundError } = require("../../Errors/userAuth.error");
const {
  FailedToFetchGithubFollowersCounts,
  FailedToFetchGithubFollowingCounts,
  FetchToFailRepositoriesError,
} = require("../../Errors/githubApi.error");

const databaseHelper = require("../Database Helpers/database.helper");

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
          "Unable to fetch the github follower count"
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
  getUpdatedUserRepos: async (userId) => {
    try {
      const user = await User.findById(userId);
      const response = await getUserRepo(user.GithubUserName);
      const newRepoDataLenghth = response.length;
      let increaseOrDecrease;
      if (newRepoDataLenghth > user.PublicRepos) {
        increaseOrDecrease = "increased";
      } else if (newRepoDataLenghth < user.PublicRepos) {
        increaseOrDecrease = "decreased";
      } else {
        increaseOrDecrease = "no_change";
      }
      await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            PublicRepos: newRepoDataLenghth,
          },
        },
        {
          $new: true,
        }
      );
      return {
        RepoCount: newRepoDataLenghth,
        increaseOrDecrease: increaseOrDecrease,
      };
    } catch (err) {
      return err;
    }
  },
  getUpdatedClosedCounts: async (userId) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      if (!repositoryDocument) {
        throw new FetchToFailRepositoriesError(
          "Unable to fetch the repository documet from database"
        );
      }
      var data = {};
      for (const repo of repositoryDocument.repositories) {
        const state = "closed";
        const response = await getRepostoryIssues(
          user.GithubUserName,
          repo.name,
          state
        );

        repo.closedIssueCount = response.length;
        data = {
          ClosedIssuesCounts: repo.closedIssueCount,
        };
      }

      await repositoryDocument.save();
      return res.status(200).json(data);
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FetchToFailRepositoriesError
      ) {
        return err;
      }
      return err;
    }
  },
  getUpdatedStarsCounts: async (userId) => {
    try {
      const user = await User.findById(userId);
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      const response = await getUserRepo(user.GithubUserName);
      console.log("Response from getUserRepo:", response);
      const updatedRepositories = await Promise.all(
        repositoryDocument.repositories.map(async (repo) => {
          try {
            response.map((repoData) => {
              console.log({
                Stars: repoData.stargazers_count,
                Repo: repo.repoName,
              });
            });
          } catch (err) {
            console.error("Error in getUserRepo:", err);
          }
        })
      );

      // Now you can update the repositoryDocument with the updatedRepositories array
      // repositoryDocument.repositories = updatedRepositories;
      // await repositoryDocument.save();
    } catch (err) {
      console.error(err);
    }
  },
};
