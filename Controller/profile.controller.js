const express = require("express");

module.exports = {
  profileData: async (req, res) => {
    const user = req.user;
    if (req.user) {
      return res.status(200).json(user);
    } else {
      return res.status(500).json("User not found");
    }
  },
};
