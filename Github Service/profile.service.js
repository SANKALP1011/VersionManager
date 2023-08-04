const { GITHUB_BASE_URL } = require("../Utils/baseUrl.util");
const axios = require("axios");

module.exports = {
  getUpdatedFollowerCount: async (userName) => {
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/users/${userName}/followers`
      );
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  getUpdatedFollowingCount: async (userName) => {
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/users/${userName}/following`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  },
};
