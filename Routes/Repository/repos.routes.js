const express = require("express");
const ReposRouter = express.Router();
const { getUserRepository } = require("../../Controller/repo.controller");

ReposRouter.get("/user/repos", getUserRepository);

module.exports = ReposRouter;
