const express = require("express");
const ProfileAnalysisRouter = express.Router();
const {
  getFollowerCountAnalysis,
  getFollowingCountAnalysis,
} = require("../../Controller/userStatisticalAnalysis.controller");

ProfileAnalysisRouter.get(
  "/user/profileAnalysis/followerAnalysis",
  getFollowerCountAnalysis
);
ProfileAnalysisRouter.get(
  "/user/profileAnalysis/followingAnalysis",
  getFollowingCountAnalysis
);

module.exports = ProfileAnalysisRouter;
