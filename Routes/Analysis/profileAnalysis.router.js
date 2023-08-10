const express = require("express");
const ProfileAnalysisRouter = express.Router();
const {
  getFollowerCountAnalysis,
  getFollowingCountAnalysis,
  getFollowerToFollowingCountAnalysis,
  getNumberOfPublicAndPrivateRepoAnalysis,
  getLanguagesUsedAnalysis,
  getMostUsedTopicAnalysis,
  getTotalClosedIssueAnalysis,
  getTotalOpenIssueAnalysis,
} = require("../../Controller/userStatisticalAnalysis.controller");

ProfileAnalysisRouter.get(
  "/user/profileAnalysis/followerAnalysis",
  getFollowerCountAnalysis
);
ProfileAnalysisRouter.get(
  "/user/profileAnalysis/followingAnalysis",
  getFollowingCountAnalysis
);
ProfileAnalysisRouter.get(
  "/user/profileAnalysis/followerToFollowingRatio",
  getFollowerToFollowingCountAnalysis
);
ProfileAnalysisRouter.get(
  "/user/profileAnalysis/repoCountAnalysis",
  getNumberOfPublicAndPrivateRepoAnalysis
);
ProfileAnalysisRouter.get(
  "/user/profileAnalysis/tsotalLanguageCountsAnalysi",
  getLanguagesUsedAnalysis
);
ProfileAnalysisRouter.get(
  "/user/profileAnalysis/totalTopicsCounts",
  getMostUsedTopicAnalysis
);
ProfileAnalysisRouter.get(
  "/user/profileAnalysis/totalClosedIssuesCounts",
  getTotalClosedIssueAnalysis
);
ProfileAnalysisRouter.get(
  "/user/profileAnalysis/totalOpenIssuesCounts",
  getTotalOpenIssueAnalysis
);
module.exports = ProfileAnalysisRouter;
