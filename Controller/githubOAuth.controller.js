const passport = require("passport");
const express = require("express");

module.exports = {
  githubAuth: passport.authenticate("github", { scope: ["user:email"] }),
  githubAuthCallback: passport.authenticate("github", {
    successRedirect: "/auth/profile",
    failureRedirect: "/login",
  }),
};
