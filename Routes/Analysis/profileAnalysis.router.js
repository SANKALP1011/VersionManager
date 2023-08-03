const express = require("express");
const ProfileAnalysisRouter = express.Router();
const {
  getFollowerCountAnalysis,
} = require("../../Controller/userStatisticalAnalysis.controller");

ProfileAnalysisRouter.get(
  "/user/profileAnalysis/followerAnalysis",
  getFollowerCountAnalysis
);

module.exports = ProfileAnalysisRouter;
