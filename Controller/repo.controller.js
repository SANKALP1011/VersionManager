const Repository = require("../Model/UserRepo.Model");
const User = require("../Model/User.model");
const PullRequest = require("../Model/UserPullRequest.model");
const {
  getUserRepo,
  getListOfClosedPullRequestforRepo,
  getRepositoryBuildLang,
  getRepositoryBranches,
} = require("../Github Service/repo.service");
const { UserNotFoundError } = require("../Errors/userAuth.error");
const {
  FailtoFetchSingleRepoByName,
  FetchToFailRepositoriesError,
  FailedToFecthPullRequestResponse,
  FailedToFetchRepositoryLanguages,
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
  getRepositoryClosedPullRequest: async (req, res) => {
    const userId = req.query.id;
    const repoName = req.query.repoName;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(`This user does not exist`);
      }

      const response = await getListOfClosedPullRequestforRepo(
        user.GithubUserName,
        repoName
      );

      if (!Array.isArray(response)) {
        throw new FailedToFecthPullRequestResponse(
          `Failed to get the pull request from the GitHub service for the repository ${repoName}`
        );
      }

      if (response.length === 0) {
        return res
          .status(200)
          .json(
            `No Pull Request exists for the repository with the name ${repoName}`
          );
      }

      // Conditional check to see if the pull request documnet of the particular user already exists

      let checkIfRepoPRDocumentExists = await PullRequest.findOne({
        repoName: repoName,
      });

      const pullRequestData = {
        user: userId,
        repository: user.GithubRepoId,
        repoName: repoName,
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

      // Saving the data to the document based on the above condition

      if (checkIfRepoPRDocumentExists) {
        checkIfRepoPRDocumentExists.pullRequest = pullRequestData.pullRequest;
        await checkIfRepoPRDocumentExists.save();
        await User.findByIdAndUpdate(
          userId,
          {
            GithubPullRequest: checkIfRepoPRDocumentExists._id,
          },
          { new: true }
        );

        await Repository.findByIdAndUpdate(
          user.GithubRepoId,
          {
            $addToSet: { pullRequestId: checkIfRepoPRDocumentExists._id },
          },
          { new: true }
        );
        return res.status(200).json(pullRequestData);
      } else {
        const newPullRequest = new PullRequest(pullRequestData);
        await newPullRequest.save();
        await User.findByIdAndUpdate(
          userId,
          {
            GithubPullRequest: newPullRequest._id,
          },
          { new: true }
        );

        await Repository.findByIdAndUpdate(
          user.GithubRepoId,
          {
            $addToSet: { pullRequestId: newPullRequest._id },
          },
          { new: true }
        );

        return res.status(200).json(newPullRequest);
      }
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
  getRepositoryTopic: async (req, res) => {
    const userId = req.query.id;
    const repoName = req.query.repoName;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exist, try signing up with this profile."
        );
      }

      const userRepositoryCollection = await Repository.findById(
        user.GithubRepoId
      );
      if (!userRepositoryCollection) {
        throw new FetchToFailRepositoriesError(
          "There is no repository collection associated with the user"
        );
      }

      // Getting single repo from the repository collection by using repo name

      const repoByName = userRepositoryCollection.repositories.find(
        (repo) => repo.name === repoName
      );
      if (!repoByName) {
        throw new FailtoFetchSingleRepoByName(
          `No repository exists with the following name ${repoName}`
        );
      }
      res.status(200).json({ topics: repoByName.repo_topics });
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailtoFetchSingleRepoByName ||
        err instanceof FetchToFailRepositoriesError
      ) {
        res.status(err.statusCode).json(err);
      }
    }
  },
  getRepositoryLanguages: async (req, res) => {
    const userId = req.query.id;
    const repoName = req.query.repoName;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError("T");
      }
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exist, try signing up with this profile."
        );
      }
      const builtLanguages = await getRepositoryBuildLang(
        user.GithubUserName,
        repoName
      );
      if (!builtLanguages) {
        throw new FailedToFetchRepositoryLanguages(
          `Unable to fetch language for the repository with the name ${repoName}`
        );
      }
      return res.status(200).json(builtLanguages);
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFetchRepositoryLanguages
      ) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getRepositoryBranchList: async (req, res) => {
    const userId = req.query.id;
    const repoName = req.query.repoName;
    try {
      const user = await User.findById(userId);
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      const response = await getRepositoryBranches(
        user.GithubUserName,
        repoName
      );
      var repo = repositoryDocument.repositories.find(
        (repo) => repo.name === repoName
      );
    } catch (err) {
      console.log(err);
    }
  },
};
// get the repo by using the repos id associtaed with the user
// find the repo by name
// update the repo branch by iterating over it
