const express = require("express");
const User = require("../Model/User.model");
const jwt = require("jsonwebtoken");

module.exports = {
  githubController: async (token, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ GithubId: profile.id });
      if (!user) {
        const newUser = new User({
          GithubId: profile.id,
          GithubUserName: profile.username,
          GithubDisplayName: profile.displayName,
          GitHubAvatar: profile._json.avatar_url,
          Company: profile._json.company,
          GitHubProtfolioa: profile._json.blog,
          Location: profile._json.location,
          GitHubBio: profile._json.bio,
          PublicRepos: profile._json.public_repos,
          GiHubFollowres: profile._json.followers,
          GitHubFollowing: profile._json.following,
        });
        console.log(newUser);
        user = newUser;
        await newUser.save();
        const client = new PostHog(process.env.POSTHOG_API_KEY, {
          host: "https://app.posthog.com",
        });

        client.capture({
          distinctId: `${user.GithubUserName} successfully signed up to your version manager api.`,
          event: "Authentication Event",
        });
      }
      console.log(token);
      const data = {
        user: user,
        accessToken: token,
      };
      return done(null, data);
    } catch (err) {
      return done(err);
    }
  },
};
