const express = require("express");
const ProfileRouter = express.Router();
const { profileData } = require("../../Controller/user.controller");
const {
  checkLoggedStatus,
} = require("../../Middleware/checkLoggedStatus.middleware");

ProfileRouter.get("/profile", checkLoggedStatus, profileData);

module.exports = ProfileRouter;
