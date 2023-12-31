const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  GithubId: {
    type: String,
    default: "",
  },
  github_Access_Token: {
    type: String,
    default: "",
  },
  GithubUserName: {
    type: String,
    default: "",
  },
  GithubDisplayName: {
    type: String,
    default: "",
  },
  GitHubAvatar: {
    type: String,
    default: "",
  },
  Company: {
    type: String,
    default: "",
  },
  GitHubProtfolioa: {
    type: String,
    default: "",
  },
  Location: {
    type: String,
    default: "",
  },
  GitHubBio: {
    type: String,
    default: "",
  },
  PublicRepos: {
    type: Number,
    default: 0,
  },
  GiHubFollowres: {
    type: Number,
    default: 0,
  },
  GitHubFollowing: {
    type: Number,
    default: 0,
  },
  GithubRepoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserRepo",
    unique: true,
    default: "",
  },
  GithubPullRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pullrequest",
    unique: true,
    default: "",
  },
});

module.exports = mongoose.model("user", UserSchema);
