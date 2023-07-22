const express = require("express");
const ReposRouter = express.Router();
const {
  getUserRepository,
  getRepositoryByName,
  getRepositoryPullRequest,
} = require("../../Controller/repo.controller");

ReposRouter.get("/user/repos", getUserRepository);
ReposRouter.get("/user/repos/getRepoByName", getRepositoryByName);
ReposRouter.get("/user/repo/getPullRequest", getRepositoryPullRequest);

module.exports = ReposRouter;
