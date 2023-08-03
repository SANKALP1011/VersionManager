const User = require("../Model/User.model");
const PullRequest = require("../Model/UserPullRequest.model");
const Repository = require("../Model/UserRepo.Model");
const { scheduleFollowerUpdateJob } = require("../Scheduler/profile.scheduler");
const {
  getUpdatedFollower,
} = require("../Helpers/Job Helpers/profileJob.helper");

module.exports = {
  getFollowerCountAnalysis: async (req, res) => {
    const userId = req.query.id;
    console.log(userId);
    try {
      scheduleFollowerUpdateJob(userId);
      const response = await getUpdatedFollower(userId);
      return res.status(200).json(response);
    } catch (err) {
      console.log(err);
    }
  },
  getFollowingCountAnalysis: async (req, res) => {},
  getFollowerToFollowingCountAnalysis: async (req, res) => {},
  getNumberOfPublicRepoAnalysis: async (req, res) => {},
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
