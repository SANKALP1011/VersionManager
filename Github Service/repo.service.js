const axios = require("axios");
require("dotenv").config({ path: require("find-config")(".env") });
const { GITHUB_BASE_URL } = require("../Utils/baseUrl.util");
const {
  FailedToFetchReposfromGithub,
  FailedToGetRepoPullRequest,
  FailedToFetchRepositoryBranch,
  FailedToFetchRespositoryIssues,
  FailedToFetchRespoistoryCommitsList,
} = require("../Errors/Github Api/githubApi.error");

axios.default.defaults.headers.common["Authorization"] =
  process.env.GITHUB_ACCESS_TOKEN;

module.exports = {
  getUserRepo: async (owner) => {
    try {
      const allRepositories = [];
      let page = 1;

      while (true) {
        const response = await axios.get(
          `${GITHUB_BASE_URL}/users/${owner}/repos`,
          {
            params: {
              per_page: 100, // Number of repositories per page (max allowed by GitHub)
              page: page,
            },
          }
        );

        if (response.data.length === 0) {
          break; // No more repositories
        }

        allRepositories.push(...response.data);
        page++;
      }

      return allRepositories;
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
  getRepositoryBuildLang: async (owner, reponame) => {
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/repos/${owner}/${reponame}/languages`
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
  getRepositoryBranches: async (owner, repoName) => {
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/repos/${owner}/${repoName}/branches`
      );
      return response.data;
    } catch (err) {
      throw new FailedToFetchRepositoryBranch("ISSSSUEE");
    }
  },
  getRepostoryIssues: async (owner, repoName, state) => {
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/repos/${owner}/${repoName}/issues?state=${state}`
      );
      return response.data;
    } catch (err) {
      throw new FailedToFetchRespositoryIssues(err);
    }
  },
  getRepositoryCommits: async (owner, repoName) => {
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/repos/${owner}/${repoName}/commits`
      );
      return response.data;
    } catch (err) {
      throw new FailedToFetchRespoistoryCommitsList(err);
    }
  },
};
