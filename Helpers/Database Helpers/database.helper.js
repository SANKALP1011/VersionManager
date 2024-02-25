const User = require("../../Model/user.model");
const Repository = require("../../Model/userRepo.model");
const PullRequest = require("../../Model/userPullRequest.model");

module.exports = {
  getUserHelper: async (id) => {
    const user = await User.findById(id);
    return user;
  },
  getRepositoryHelper: async (id) => {
    const repositoryDocument = await Repository.findById(id);
    return repositoryDocument;
  },
  getPullRequestHelper: async (id) => {
    const pullRequestDocument = await PullRequest.findById(id);
    return pullRequestDocument;
  },
};
