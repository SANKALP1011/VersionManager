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
      const events = [];
      let url = `${GITHUB_BASE_URL}/users/${userName}/events`;

      while (url) {
        const response = await axios.get(url);
        events.push(...response.data);

        const linkHeader = response.headers.link;
        const nextLink = findNextLink(linkHeader);

        url = nextLink;
      }

      return events;
    } catch (err) {
      throw new FailedToFetchProfileEventsForUser(
        "Unable to fetch the events for the user profile"
      );
    }
  },
};

const findNextLink = (linkHeader) => {
  if (linkHeader) {
    const links = linkHeader.split(",");
    const nextLink = links.find((link) => link.includes('rel="next"'));

    if (nextLink) {
      return nextLink.split(";")[0].trim().slice(1, -1);
    }
  }
  return null;
};
