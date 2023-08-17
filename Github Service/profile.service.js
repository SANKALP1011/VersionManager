const { GITHUB_BASE_URL } = require("../Utils/baseUrl.util");
const axios = require("axios");
const {
  FailedToFetchProfileEventsForUser,
} = require("../Errors/githubApi.error");

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
  getUserActionsEvents: async (userName) => {
    try {
      const response = await axios.default.get(
        `${GITHUB_BASE_URL}/users/${userName}/events`
      );
      return response.data;
    } catch (err) {
      throw new FailedToFetchProfileEventsForUser(
        "Unable to fetch the events for the user profile"
      );
    }
  },
};
