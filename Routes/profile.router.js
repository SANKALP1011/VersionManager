const express = require("express");
const ProfileRouter = express.Router();
const { profileData } = require("../Controller/profile.controller");

ProfileRouter.get("/profile", profileData);

module.exports = ProfileRouter;
