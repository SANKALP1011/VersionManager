require("dotenv").config({ path: require("find-config")(".env") });

module.exports = {
  GithubKey: {
    ClientId: process.env.GITHUB_CLIENT_ID,
    ClientSecret: process.env.GITHUB_CLIENT_SECRET,
    CallbackUrl: "http://localhost:3004/auth/github/callback",
  },
};
