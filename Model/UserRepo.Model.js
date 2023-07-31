const mongoose = require("mongoose");

const UserRepoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  pullRequestId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "pullrequest",
    },
  ],
  repositories: [
    {
      name: {
        type: String,
        default: "",
      },
      private: {
        type: Boolean,
        default: false,
      },
      repoUrl: {
        type: String,
        default: "",
      },
      description: {
        type: String,
        default: "",
      },
      dateOfCreation: {
        type: Date,
        default: Date.now,
      },
      repoStarsCount: {
        type: Number,
        default: 0,
      },
      repoWatchersCount: {
        type: Number,
        default: 0,
      },
      buildLanguage: {
        type: String,
        default: "",
      },
      repoForkCounts: {
        type: Number,
        default: 0,
      },
      languagesUsedUrl: {
        type: String,
        default: "",
      },
      openIssuesCount: {
        type: Number,
        default: 0,
      },
      closedIssueCount: {
        type: Number,
        default: 0,
      },
      repo_topics: {
        type: [String],
        default: [],
      },
      line_of_count: {
        type: Map,
        of: Number,
      },
      branches: [
        {
          name: {
            type: String,
            default: "",
          },
          url: {
            type: String,
            default: "",
          },
        },
      ],
      commit_history: [
        {
          author_Namae: {
            type: String,
            default: "",
          },
          author_commit_message: {
            type: String,
            default: "",
          },
          commit_Date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      repo_readme_content: {
        type: String,
        default: "",
      },
    },
  ],
});

module.exports = mongoose.model("UserRepo", UserRepoSchema);
