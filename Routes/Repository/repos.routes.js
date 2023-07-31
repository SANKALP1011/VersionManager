const express = require("express");
const ReposRouter = express.Router();
const {
  getUserRepository,
  getRepositoryByName,
  getRepositoryClosedPullRequest,
  getRepositoryTopic,
  getRepositoryLanguages,
  getRepositoryBranchList,
  getRepositoryIssue,
  getRepositoryCommits,
} = require("../../Controller/repo.controller");

ReposRouter.get("/user/repos", getUserRepository);
ReposRouter.get("/user/repos/getRepoByName", getRepositoryByName);
ReposRouter.get(
  "/user/repos/repo/getPullRequest",
  getRepositoryClosedPullRequest
);
ReposRouter.get("/user/repos/repo/getRepoTopics", getRepositoryTopic);
ReposRouter.get("/user/repos/repo/getRepoLang", getRepositoryLanguages);
ReposRouter.get("/user/repos/repo/getBranches", getRepositoryBranchList);
ReposRouter.get("/user/repos/repo/getIssues", getRepositoryIssue);
ReposRouter.get("/user/repos/repo/getCommits", getRepositoryCommits);

module.exports = ReposRouter;
