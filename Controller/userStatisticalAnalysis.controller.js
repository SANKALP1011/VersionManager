const User = require("../Model/User.model");
const PullRequest = require("../Model/UserPullRequest.model");
const Repository = require("../Model/UserRepo.Model");
const { scheduleFollowerUpdateJob } = require("../Scheduler/profile.scheduler");
const {
  getUpdatedFollower,
  getUpdatedFollowing,
  getUpdatedUserRepos,
  getUpdatedClosedCounts,
} = require("../Helpers/Job Helpers/profileJob.helper");
const {
  FailedToPerformFollowerorFollowingCountAnalysis,
  FailedToPerformFollowwrToFollowingRation,
  FailedToPerformRepoCountAnalysis,
} = require("../Errors/analysis.error");
const { UserNotFoundError } = require("../Errors/userAuth.error");

module.exports = {
  getFollowerCountAnalysis: async (req, res) => {
    const userId = req.query.id;
    console.log(userId);
    try {
      scheduleFollowerUpdateJob(userId);
      const response = await getUpdatedFollower(userId);
      if (!response) {
        throw new FailedToPerformFollowerorFollowingCountAnalysis(
          "Unable to perform the analysis on the folloower counts"
        );
      }
      return res.status(200).json(response);
    } catch (err) {
      if (err instanceof FailedToPerformFollowerorFollowingCountAnalysis) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getFollowingCountAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      scheduleFollowerUpdateJob(userId);
      const response = await getUpdatedFollowing(userId);
      if (!response) {
        throw new FailedToPerformFollowerorFollowingCountAnalysis(
          "Unable to perform the analysis on the following counts"
        );
      }
      return res.status(200).json(response);
    } catch (err) {
      if (err instanceof FailedToPerformFollowerorFollowingCountAnalysis) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getFollowerToFollowingCountAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      var followingCount = user.GitHubFollowing;
      var followerCount = user.GiHubFollowres;
      var num = followingCount;
      for (num; num > 1; num--) {
        if (followerCount % num == 0 && followerCount % num == 0) {
          followerCount = followerCount / num;
          followingCount = followingCount / num;
        }
      }
      var ratio = followerCount + ":" + followingCount;
      if (ratio == 0) {
        throw new FailedToPerformFollowwrToFollowingRation(
          "There is some issye while petforming analysis"
        );
      }
      return res.status(200).json({ FollowerToFollowingRation: ratio });
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToPerformFollowwrToFollowingRation
      ) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getNumberOfPublicAndPrivateRepoAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      scheduleFollowerUpdateJob(userId);
      const response = await getUpdatedUserRepos(userId);
      if (!response) {
        throw new FailedToPerformRepoCountAnalysis(
          "There is some issue while performing repo count analysis"
        );
      }
      return res.status(200).json(response);
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToPerformRepoCountAnalysis
      ) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getLanguagesUsedAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      const repositories = await Repository.findById(user.GithubRepoId);
      var totalLangaugeByteCounts = {};
      for (var repo of repositories.repositories) {
        var repoLangauages = repo.languagesBytesOfCodeUsed;
        for (const languageData of repoLangauages) {
          const language = languageData.language;

          const bytesOfCode = languageData.bytesOfCode;

          if (totalLangaugeByteCounts[language]) {
            totalLangaugeByteCounts[language] += bytesOfCode;
          } else {
            totalLangaugeByteCounts[language] = bytesOfCode;
          }
        }
      }
      return res.status(200).json(totalLangaugeByteCounts);
    } catch (err) {
      console.log(err);
    }
  },
  getMostUsedTopicAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      await getUpdatedClosedCounts(userId);
      const repositories = await Repository.findById(user.GithubRepoId);

      // Initialize an object to store the topic counts
      const topicCounts = {};

      // Iterate through each repository
      for (const repo of repositories.repositories) {
        const repoTopics = repo.repo_topics;

        // Count the occurrences of each topic
        for (const topic of repoTopics) {
          if (topicCounts[topic]) {
            topicCounts[topic] += 1;
          } else {
            topicCounts[topic] = 1;
          }
        }
      }

      return res.status(200).json(topicCounts);
    } catch (err) {
      console.error("Error in getMostUsedTopicAnalysis:", err);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  },
  getTotalClosedIssueAnalysis: async (req, res) => {
    // create a job that would be be able to fetch the updated repo closed isssues counts everyday at 12:00 am.
    // this would be used for kepping the data up to date.
    // thing would be like the that closed issues would be updated for all the repositories i.e we would iterate through all the repository name
    // pass the repo name into the getRepoIssue and then update all the issue counts for all that repository.
    // run that job in the cron task scheduler which would update the issue count evrey day at 12:00 am.
    // then perform entire analysis over that entire repository documents
    const userId = req.query.id;
    try {
    } catch (err) {}
  },
};
