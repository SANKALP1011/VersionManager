const Repository = require("../Model/UserRepo.Model");
const User = require("../Model/User.model");
const { Octokit } = require("@octokit/rest");
const { getUserRepo } = require("../Github Service/repo.service");

module.exports = {
  getUserRepository: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({
          Error: "This user does not exist",
        });
      } else {
        const response = await getUserRepo(user.GithubUserName);
        return res.status(200).json(response);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        Error: "Internal server error",
      });
    }
  },
};
