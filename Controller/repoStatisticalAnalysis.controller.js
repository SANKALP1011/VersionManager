const User = require("../Model/User.model");
const Repository = require("../Model/UserRepo.Model");
const PullRequest = require("../Model/UserPullRequest.model");

module.exports = {
  getTopicsAnalysis: async (req, res) => {},
  getLanguageAnalysis: async (req, res) => {},
  getNumberOfLinesOfCodePushedAnalysis: async (req, res) => {},
  getRepostoryClosedIssueAnalysis: async (req, res) => {},
  getRepostoryOpenIssueAnalysis: async (req, res) => {},
  getIssueRatioAnalysis: async (req, res) => {},
  getNumberOfBranchAnalysis: async (req, res) => {},
  getDayWiseCommitsAnalysis: async (req, res) => {},
  getStarsAnalysis: async (req, res) => {},
  getForkAnalysis: async (req, res) => {},
};

// DECIDE ON MORE FACTORS AND FIND THE WAY HOW TO GET ALL THESE THINGS FOR ANALYSIS IE WHEN USER CLICKS ON REPO ALL THESE ANALYSIS SHOULD BE AVAILAIBLE.
