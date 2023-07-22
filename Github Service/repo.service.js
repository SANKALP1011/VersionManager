const axios = require("axios");
const { GITHUB_BASE_URL } = require("../Utils/baseUrl.util");
const {
  FailedToFetchReposfromGithub,
  FailedToGetRepoPullRequest,
} = require("../Errors/githubApi.error");
const tok = "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";

axios.default.defaults.headers.common["Authorization"] = tok;

module.exports = {
  getUserRepo: async (owner) => {
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/users/${owner}/repos`
      );
      return response.data;
    } catch (err) {
      throw new FailedToFetchReposfromGithub(err.message);
    }
  },
  getListOfClosedPullRequestforRepo: async (owner, reponame) => {
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/repos/${owner}/${reponame}/pulls?state=closed`
      );
      return response.data;
    } catch (err) {
      throw new FailedToGetRepoPullRequest(err.message);
    }
  },
};
