const Repository = require("../Model/UserRepo.Model");
const User = require("../Model/User.model");
const PullRequest = require("../Model/UserPullRequest.model");
const {
  getUserHelper,
  getRepositoryHelper,
  getPullRequestHelper,
} = require("../Helpers/Database Helpers/database.helper");
const {
  getUserRepo,
  getListOfClosedPullRequestforRepo,
  getRepositoryBuildLang,
  getRepositoryBranches,
  getRepostoryIssues,
  getRepositoryCommits,
} = require("../Github Service/repo.service");
const { UserNotFoundError } = require("../Errors/userAuth.error");
const {
  FailtoFetchSingleRepoByName,
  FetchToFailRepositoriesError,
  FailedToFecthPullRequestResponse,
  FailedToFetchRepositoryLanguages,
  FailedToGetRepoistoryBranchs,
  FailedToFetchtRepositoryIssues,
} = require("../Errors/repo.error");
const {
  FailedToSaveDocumentToDatabase,
} = require("../Errors/databaseError.error");
const { json } = require("express");

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
          userId: userId,
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
          { userId: userId },
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
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      if (!user) {
        throw new UserNotFoundError("This user does not exist in our database");
      }
      const builtLanguages = await getRepositoryBuildLang(
        user.GithubUserName,
        repoName
      );
      if (!builtLanguages) {
        throw new FailedToFetchRepositoryLanguages(
          `Unable to fetch languages for the repository with the name ${repoName}`
        );
      }

      var repo = repositoryDocument.repositories.find((repo) => {
        return repo.name === repoName;
      });
      if (!repo) {
        throw new FailtoFetchSingleRepoByName(
          `Repo with the name ${repoName} does not exist in your profile`
        );
      }

      // Construct an array of language objects from the fetched language details
      const languageObject = Object.keys(builtLanguages).map((language) => {
        return {
          language: language,
          bytesOfCode: builtLanguages[language],
        };
      });

      console.log(languageObject);

      languageObject.forEach((langObj) => {
        const index = repo.languagesBytesOfCodeUsed.findIndex(
          (lang) => lang.language === langObj.language
        );
        if (index !== -1) {
          // Language already exists, update bytesOfCode
          repo.languagesBytesOfCodeUsed[index].bytesOfCode =
            langObj.bytesOfCode;
        } else {
          // Language does not exist, add new object
          repo.languagesBytesOfCodeUsed.push(langObj);
        }
      });

      await repositoryDocument.save();
      return res.status(200).json(repo.languagesBytesOfCodeUsed);
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFetchRepositoryLanguages ||
        err instanceof FailtoFetchSingleRepoByName
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
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database."
        );
      }
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      const response = await getRepositoryBranches(
        user.GithubUserName,
        repoName
      );
      if (!Array.isArray(response)) {
        throw new FailedToGetRepoistoryBranchs(
          `Unable to fetch the branches for the repository with the name ${repoName}`
        );
      }
      var repo = repositoryDocument.repositories.find(
        (repo) => repo.name === repoName
      );
      response.forEach((branch) => {
        repo.branches.push({
          name: branch.name,
          url: branch.url,
        });
      });
      await repositoryDocument.save();
      return res.status(200).json(repo.branches);
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToGetRepoistoryBranchs
      ) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getRepositoryIssue: async (req, res) => {
    const userId = req.query.id;
    const repoName = req.query.repoName;
    const state = req.query.state;
    try {
      const user = await getUserHelper(userId);
      if (!user) {
        throw new UserNotFoundError("This user does not exist in our database");
      }
      const repositories = await getRepositoryHelper(user.GithubRepoId);
      if (!Array.isArray(repositories.repositories)) {
        throw new FailedToFetchRepositoryIssues(
          `Unable to get the issues for the repository with the name ${repoName}`
        );
      }
      const response = await getRepostoryIssues(
        user.GithubUserName,
        repoName,
        state
      );

      var repo = repositories.repositories.find(
        (repo) => repo.name === repoName
      );
      if (state === "closed") {
        repo.closedIssueCount = response.length;
      }
      if (state === "open") {
        repo.openIssuesCount = response.length;
      }

      // Assuming repositories.save() is the correct method to save changes.
      await repositories.save();

      return res.status(200).json(response.length);
    } catch (err) {
      console.log(err);
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFetchtRepositoryIssues
      ) {
        return res.status(err.statusCode).json(err);
      }
      // Handle other errors with a generic response
      return res.status(500).json({ error: "An error occurred" });
    }
  },
  getRepositoryReadmeContent: async (req, res) => {
    // THERE IS AN ISSUE HERE WITH THE GITHUB README CONTENT , NOT ABLE TO GENERATE THE RAW CONTENT FOR GITHUB README
    // WORK ON THIS CONTROLLER WHEN YOU ARE ABLE TO FIND THE EXACT REASON WHY I AM NOT ABLE TO GET THE README CONTENT
    const userId = req.query.id;
    const repoName = req.query.repoName;
    try {
    } catch (err) {}
  },
  getRepositoryCommits: async (req, res) => {
    const userId = req.query.id;
    const repoName = req.query.repoName;
    try {
      const user = await User.findById(userId);
      const repositporyDocumet = await Repository.findById(user.GithubRepoId);
      const repo = repositporyDocumet.repositories.find(
        (repo) => repo.name === repoName
      );
      const response = await getRepositoryCommits(
        user.GithubUserName,
        repoName
      );
      response.forEach((value) => {
        repo.commit_history.push({
          author_Namae: value.commit.author.name,
          author_commit_message: value.commit.message,
          commit_Date: value.commit.author.date,
        });
      });
      await repositporyDocumet.save();
      return res.status(200).json(repo.commit_history);
    } catch (err) {}
  },
};
