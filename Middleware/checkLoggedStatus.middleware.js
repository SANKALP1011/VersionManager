const passport = require("passport");
const express = require("express");

module.exports = {
  checkLoggedStatus: async (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      next();
    }
  },
};
