const passport = require("passport");
const express = require("express");

module.exports = {
  checkLoggedStatus: async (req, res, next) => {
    if (req.isAuthneticated()) {
      next();
    } else {
      next();
    }
  },
};
