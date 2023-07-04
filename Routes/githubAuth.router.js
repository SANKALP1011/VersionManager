const express = require("express");
const GithubRouter = express.Router();
const {
  githubAuth,
  githubAuthCallback,
} = require("../Controller/githubOAuth.controller");

GithubRouter.get("/github", githubAuth);
GithubRouter.get("/github/callback", githubAuthCallback);

module.exports = GithubRouter;
