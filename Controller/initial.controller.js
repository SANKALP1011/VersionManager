const express = require("express");

module.exports = {
  initial: async (req, res) => {
    return res
      .status(200)
      .json(
        "Welcome to the version manager. All in one backend for managing your projects , provide insightful analysis for your projects and repos"
      );
  },
};
