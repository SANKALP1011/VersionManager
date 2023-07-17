const axios = require("axios");
const { GITHUB_BASE_URL } = require("../Utils/baseUrl.util");
const tok = "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";

axios.default.defaults.headers.common["Authorization"] = tok;

module.exports = {
  getUserRepo: async (username) => {
    console.log(username);
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/users/${username}/repos`
      );
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
