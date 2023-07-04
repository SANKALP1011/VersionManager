const passport = require("passport");
const express = require("express");
const { use } = require("passport");

module.exports = {
  githubController: async (token, refreshToken, profile, done) => {
    const data = {
      Profile: profile,
      Token: token,
    };
    return done(null, data);
  },
};
