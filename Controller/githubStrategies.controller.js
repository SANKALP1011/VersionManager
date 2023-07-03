const passport = require("passport");
const express = require("express");

module.exports = {
  githubAuthController: async (
    req,
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    console.log(profile);
  },
};
