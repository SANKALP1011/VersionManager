const Repository = require("../Model/UserRepo.Model");
const User = require("../Model/User.model");
const PullRequest = require("../Model/UserPullRequest.model");
const {
  getUserRepo,
  getListOfClosedPullRequestforRepo,
} = require("../Github Service/repo.service");
const { UserNotFoundError } = require("../Errors/userAuth.error");
const {
  FailtoFetchSingleRepoByName,
  FetchToFailRepositoriesError,
  FailedToFecthPullRequestResponse,
} = require("../Errors/repo.error");
const {
  FailedToSaveDocumentToDatabase,
} = require("../Errors/databaseError.error");

module.exports = {
  getUserRepository: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError("This user does not exist", 404);
      } else {
        const response = await getUserRepo(user.GithubUserName);

        const repositoryData = {
          userId: user._id,
          repositories: response.map((repo) => ({
            name: repo.name,
            private: repo.private,
            repoUrl: repo.html_url,
            description: repo.description,
            dateOfCreation: repo.created_at,
            repoStarsCount: repo.stargazers_count,
            repoWatchersCount: repo.watchers_count,
            buildLanguage: repo.language,
            repoForkCounts: repo.forks_count,
            languagesUsedUrl: repo.languages_url,
            openIssuesCount: repo.open_issues_count,
            repo_topics: repo.topics || [],
          })),
        };

        const data = await Repository.findOneAndUpdate(
          { userId: user._id },
          repositoryData,
          {
            upsert: true,
          }
        );

        await User.findByIdAndUpdate(
          userId,
          {
            GithubRepoId: data._id,
          },
          { new: true }
        );
        return res.status(200).json(repositoryData);
      }
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return res.status(400).json({ error: err.message });
      } else {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  },
  getRepositoryByName: async (req, res) => {
    const userId = req.query.id;
    const name = req.query.repoName;
    console.log(name);
    try {
      const userRepoDocument = await Repository.findOne({ userId: userId });
      if (!userRepoDocument) {
        throw new FetchToFailRepositoriesError(
          "Failed to fetch the user repository collection"
        );
      }
      const repo = userRepoDocument.repositories.find(
        (repo) => repo.name === name
      );
      if (!repo) {
        throw new FailtoFetchSingleRepoByName(
          `This repository by the name ${name} does not exists`
        );
      }
      return res.status(200).json(repo);
    } catch (err) {
      if (
        err instanceof FetchToFailRepositoriesError ||
        err instanceof FailtoFetchSingleRepoByName
      ) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getRepositoryPullRequest: async (req, res) => {
    const userId = req.query.id;
    const repoName = req.query.repoName;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(`This user does not exists`);
      }
      const response = await getListOfClosedPullRequestforRepo(
        user.GithubUserName,
        repoName
      );
      if (!Array.isArray(response)) {
        throw new FailedToFecthPullRequestResponse(
          `Failed to get the pull request from the github service for the repository ${repoName}`
        );
      }

      if (response.length === 0) {
        return res
          .status(200)
          .json(
            `No Pull Request exists for the repository with the name ${repoName}`
          );
      }

      const pullRequestData = {
        user: userId,
        repository: user.GithubRepoId,
        pullRequest: [],
      };

      for (const pullRequest of response) {
        pullRequestData.pullRequest.push({
          isOpen: false,
          title: pullRequest.title,
          description: pullRequest.description,
          createdAt: pullRequest.createdAt,
        });
      }

      const newPullRequest = new PullRequest(pullRequestData);
      await newPullRequest.save();

      if (newPullRequest.errors) {
        throw new FailedToSaveDocumentToDatabase(
          "There was issue while saving this docmunet to the database"
        );
      }

      await User.findByIdAndUpdate(
        userId,
        {
          GithubPullRequest: newPullRequest._id,
        },
        { new: true }
      );

      await Repository.findById(user.GithubRepoId, {
        pullRequestId: newPullRequest._id,
      });

      return res.status(200).json(newPullRequest);
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFecthPullRequestResponse ||
        err instanceof FailedToSaveDocumentToDatabase
      ) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getRepositoryTopic: async (req, res) => {},
};

// get pr ,  user passes name and id , we get the pr for that repo name , now we have to make sure that when user fetched
// pull request they would peroform the followinng checks -:
/*
check 1 - check if the document associcauted with the repo pr alreday exists
        - if yes , update that specifc document 
        - else create a new document

*/
