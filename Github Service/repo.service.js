const { Octokit } = require("@octokit/rest");
const axios = require("axios");
const { request } = require("@octokit/request");
const tok = "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";

const octokit = new Octokit({
  auth: tok,
});

module.exports = {
  getUserRepo: async (username) => {
    console.log(username);
    try {
      const result = await request(`GET /users/${username}/repos`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          authorization: `bearer ${tok}`,
        },
      });

      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};
