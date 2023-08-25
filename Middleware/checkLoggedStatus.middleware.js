const passport = require("passport");
const express = require("express");

// TO DO : WORK ON MIDDLEWARE FUNCTIONALITY

module.exports = {
  checkLoggedStatus: async (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      next();
    }
  },
};
