const { Octokit } = require("@octokit/rest");
const axios = require("axios");

const octokit = new Octokit({
  auth: "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",
  request: {
    fetch: axios,
  },
});

module.exports = {
  getUserRepo: async (username) => {
    console.log(username);
    try {
      const { data } = await octokit.rest.repos.listForUser({
        username: username,
      });
      console.log(data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
