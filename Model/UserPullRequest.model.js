const mongoose = require("mongoose");

const UserRepositoryPullRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  repository: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "repo",
    required: true,
  },
  repoName: {
    type: String,
    default: "",
  },
  pullRequest: [
    {
      isOpen: {
        type: String,
        default: "",
      },
      title: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("pullrequest", UserRepositoryPullRequestSchema);
