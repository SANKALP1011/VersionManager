const User = require("../Model/User.model");
const PullRequest = require("../Model/UserPullRequest.model");
const Repository = require("../Model/UserRepo.Model");
const cron = require("node-cron");

module.exports = {
  getFollowerCountAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      // add the crom job scheduler that would fethc the follower and followimg lsit every time at 12:00 am and update the data with the fresh feed
      // GET THE INITIAL FOLLOWER COUNT
      // CHECK WHTHER THE COUNT OF FLOWER IS INCREASE OR NOT
      // IF IMCREAE RETURN FOLLOWER COUNT AND INCREASE BY IN JSON FORMAT
      // IF DECERETD RETRUN THE FOLLOWERR COUNT AND DECRESE BY COUNT
      // WOULD BE USED FOR ANALYSIS IN FRONTEND , 
    } catch (err) {}
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
