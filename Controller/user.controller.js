const express = require("express");
const User = require("../Model/User.model");
const { UserNotFoundError } = require("../Errors/userAuth.error");

module.exports = {
  profileData: async (req, res) => {
    const user = req.user;
    console.log(user);
    if (req.user) {
      return res.status(200).json(user);
    } else {
      return res.status(500).json("User not found");
    }
  },
  getUserbyId: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
      }
      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
};
