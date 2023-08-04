const User = require("../Model/User.model");
const PullRequest = require("../Model/UserPullRequest.model");
const Repository = require("../Model/UserRepo.Model");
const { scheduleFollowerUpdateJob } = require("../Scheduler/profile.scheduler");
const {
  getUpdatedFollower,
  getUpdatedFollowing,
  getUpdatedUserRepos,
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
  getNumberOfPrivateRepoAnalysis: async (req, res) => {},
  getPublicToPrivateRepoRationAnalysis: async (req, res) => {},
  getLanguagesUsedAnalysis: async (req, res) => {},
  getMostRecentRepositoryCommitAnalysis: async (req, res) => {},
  getMostUsedTopicAnalysis: async (req, res) => {},
  getLinesOfCodePushedYearwiseAnalysis: async (req, res) => {},
  getTotalClosedIssueAnalysis: async (req, res) => {},
  getTotalOpenIssueAnalysis: async (req, res) => {},
  getContributionHistoryAnalysis: async (req, res) => {},
  getTotalPullRequestCountAnalysis: async (req, res) => {},
  getLanguagesLinesOfCodeAnalysis: async (req, res) => {},
  getOrganisationCountAnalysis: async (req, res) => {},
  getTotalStarsAnalysis: async (req, res) => {},
  getTopRepositoryAnalysis: async (req, res) => {},
};
