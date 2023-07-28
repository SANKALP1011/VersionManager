const User = require("../../Model/User.model");
const Repository = require("../../Model/UserRepo.Model");
const PullRequest = require("../../Model/UserPullRequest.model");

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
