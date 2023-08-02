const User = require("../Model/User.model");
const PullRequest = require("../Model/UserPullRequest.model");
const Repository = require("../Model/UserRepo.Model");

module.exports = {
  getFollowerCountAnalysis: async (req, res) => {},
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
