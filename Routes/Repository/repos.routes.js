const express = require("express");
const ReposRouter = express.Router();
const {
  getUserRepository,
  getRepositoryByName,
  getRepositoryPullRequest,
  getRepositoryTopic,
  getRepositoryLanguages,
} = require("../../Controller/repo.controller");

ReposRouter.get("/user/repos", getUserRepository);
ReposRouter.get("/user/repos/getRepoByName", getRepositoryByName);
ReposRouter.get("/user/repos/repo/getPullRequest", getRepositoryPullRequest);
ReposRouter.get("/user/repos/repo/getRepoTopics", getRepositoryTopic);
ReposRouter.get("/user/repos/repo/getRepoLang", getRepositoryLanguages);

module.exports = ReposRouter;
