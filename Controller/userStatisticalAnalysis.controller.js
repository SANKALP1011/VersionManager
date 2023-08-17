const User = require("../Model/User.model");
const PullRequest = require("../Model/UserPullRequest.model");
const Repository = require("../Model/UserRepo.Model");
const { scheduleFollowerUpdateJob } = require("../Scheduler/profile.scheduler");
const {
  getUpdatedFollower,
  getUpdatedFollowing,
  getUpdatedUserRepos,
  getUpdatedClosedCounts,
  getUpdatedStarsCounts,
} = require("../Helpers/Job Helpers/profileJob.helper");
const {
  FailedToPerformFollowerorFollowingCountAnalysis,
  FailedToPerformFollowwrToFollowingRation,
  FailedToPerformRepoCountAnalysis,
} = require("../Errors/analysis.error");
const {
  FailedToFetchDocumentFromDatabase,
  FailedToPerformCountOfDocuments,
} = require("../Errors/databaseError.error");
const { UserNotFoundError } = require("../Errors/userAuth.error");

module.exports = {
  getFollowerCountAnalysis: async (req, res) => {
    const userId = req.query.id;
    console.log(userId);
    try {
      scheduleFollowerUpdateJob(userId);
      const response = await getUpdatedFollower(userId);
      if (!response) {
        throw new FailedToPerformFollowerorFollowingCountAnalysis(
          "Unable to perform the analysis on the folloower counts"
        );
      }
      return res.status(200).json(response);
    } catch (err) {
      if (err instanceof FailedToPerformFollowerorFollowingCountAnalysis) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getFollowingCountAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      scheduleFollowerUpdateJob(userId);
      const response = await getUpdatedFollowing(userId);
      if (!response) {
        throw new FailedToPerformFollowerorFollowingCountAnalysis(
          "Unable to perform the analysis on the following counts"
        );
      }
      return res.status(200).json(response);
    } catch (err) {
      if (err instanceof FailedToPerformFollowerorFollowingCountAnalysis) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getFollowerToFollowingCountAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      var followingCount = user.GitHubFollowing;
      var followerCount = user.GiHubFollowres;
      var num = followingCount;
      for (num; num > 1; num--) {
        if (followerCount % num == 0 && followerCount % num == 0) {
          followerCount = followerCount / num;
          followingCount = followingCount / num;
        }
      }
      var ratio = followerCount + ":" + followingCount;
      if (ratio == 0) {
        throw new FailedToPerformFollowwrToFollowingRation(
          "There is some issye while petforming analysis"
        );
      }
      return res.status(200).json({ FollowerToFollowingRation: ratio });
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToPerformFollowwrToFollowingRation
      ) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getNumberOfPublicAndPrivateRepoAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      scheduleFollowerUpdateJob(userId);
      const response = await getUpdatedUserRepos(userId);
      if (!response) {
        throw new FailedToPerformRepoCountAnalysis(
          "There is some issue while performing repo count analysis"
        );
      }
      return res.status(200).json(response);
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToPerformRepoCountAnalysis
      ) {
        return res.status(err.statusCode).json(err);
      }
    }
  },
  getLanguagesUsedAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      const repositories = await Repository.findById(user.GithubRepoId);
      var totalLangaugeByteCounts = {};
      for (var repo of repositories.repositories) {
        var repoLangauages = repo.languagesBytesOfCodeUsed;
        for (const languageData of repoLangauages) {
          const language = languageData.language;

          const bytesOfCode = languageData.bytesOfCode;

          if (totalLangaugeByteCounts[language]) {
            totalLangaugeByteCounts[language] += bytesOfCode;
          } else {
            totalLangaugeByteCounts[language] = bytesOfCode;
          }
        }
      }
      return res.status(200).json(totalLangaugeByteCounts);
    } catch (err) {
      console.log(err);
    }
  },
  getMostUsedTopicAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);

      const repositories = await Repository.findById(user.GithubRepoId);

      // Initialize an object to store the topic counts
      const topicCounts = {};

      // Iterate through each repository
      for (const repo of repositories.repositories) {
        const repoTopics = repo.repo_topics;

        // Count the occurrences of each topic
        for (const topic of repoTopics) {
          if (topicCounts[topic]) {
            topicCounts[topic] += 1;
          } else {
            topicCounts[topic] = 1;
          }
        }
      }

      return res.status(200).json(topicCounts);
    } catch (err) {
      console.error("Error in getMostUsedTopicAnalysis:", err);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  },
  getTotalClosedIssueAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);

      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      var closedIssueCount = 0;
      repositoryDocument.repositories.forEach((repo) => {
        console.log(repo.closedIssueCount);
        closedIssueCount += repo.closedIssueCount;
      });
      return res.status(200).json({
        ClosedCount: closedIssueCount,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getTotalOpenIssueAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      var openIssueCount = 0;
      repositoryDocument.repositories.forEach((repo) => {
        console.log(repo.openIssuesCount);
        openIssueCount += repo.openIssuesCount;
      });
      return res.status(200).json({
        OpenCount: openIssueCount,
      });
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return res.status(err.statusCode).json(err);
      }
      return err;
    }
  },
  getNumberOfLinesOfCodePushedAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      if (!repositoryDocument) {
        throw new FailedToFetchDocumentFromDatabase(
          "Unable to fetch the document from database"
        );
      }
      var totalBytesOfCodesPushed = 0;
      repositoryDocument.repositories.forEach((repo) => {
        repo.languagesBytesOfCodeUsed.forEach((lang) => {
          totalBytesOfCodesPushed += lang.bytesOfCode;
        });
      });
      return res.status(200).json({
        TotalCodePushedSinceJoingingGit: totalBytesOfCodesPushed,
      });
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFetchDocumentFromDatabase
      ) {
        return res.status(err.statusCode).json(err);
      }
      return res.status(500).json(err);
    }
  },
  getTotalStarsForProfileAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in  our database"
        );
      }
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      if (!repositoryDocument) {
        throw new FailedToFetchDocumentFromDatabase(
          "Unable to fetch the document from the database"
        );
      }
      var totalStarsCount = 0;
      repositoryDocument.repositories.forEach((repo) => {
        totalStarsCount += repo.repoStarsCount;
      });
      return res.status(200).json({
        TotalStarsCount: totalStarsCount,
      });
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFetchDocumentFromDatabase
      ) {
        return res.status(err.statusCode).json(err);
      }
      return res.status(500).json(err);
    }
  },
  getNewestAndOldestRepoAnalysis: async (req, res) => {
    const userId = req.query.id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new UserNotFoundError("This user does not exist in our database");
      }

      const repositoryDocument = await Repository.findById(user.GithubRepoId);

      if (!repositoryDocument) {
        throw new FailedToFetchDocumentFromDatabase(
          "Unable to fetch the repository document from the database"
        );
      }

      const repositories = repositoryDocument.repositories;

      if (repositories.length === 0) {
        return res.status(200).json({ message: "No repositories found" });
      }

      const currentDate = new Date();

      // Find the oldest and newest repositories based on ageInDays
      const oldestRepo = repositories.reduce(
        (oldest, repo) => {
          const repoCreationDate = new Date(repo.dateOfCreation);
          const diffInTime = currentDate.getTime() - repoCreationDate.getTime();
          const ageInDays = Math.trunc(diffInTime / (1000 * 3600 * 24));

          if (ageInDays > oldest.ageInDays) {
            return { ageInDays, repo };
          }

          return oldest;
        },
        { ageInDays: -Infinity, repo: null }
      ).repo;

      const newestRepo = repositories.reduce(
        (newest, repo) => {
          const repoCreationDate = new Date(repo.dateOfCreation);
          const diffInTime = currentDate.getTime() - repoCreationDate.getTime();
          const ageInDays = Math.trunc(diffInTime / (1000 * 3600 * 24));

          if (ageInDays < newest.ageInDays) {
            return { ageInDays, repo };
          }

          return newest;
        },
        { ageInDays: Infinity, repo: null }
      ).repo;

      res.status(200).json({ oldestRepo, newestRepo });
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFetchDocumentFromDatabase
      ) {
        return res.status(err.statusCode).json(err);
      }
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getOrganisationAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      if (user.Company === "") {
        return res.status(200).json({ Company: "None" });
      } else {
        return res.status(200).json({ Company: user.Company });
      }
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return res.status(err.statusCode).json(err);
      }
      return res.status(500).json(err);
    }
  },
  getTopRepositoryAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      var topRepo = {};
      var negCount = Number.NEGATIVE_INFINITY;
      repositoryDocument.repositories.forEach((repo) => {
        if (repo.repoStarsCount > negCount) {
          topRepo = {
            Name: repo.name,
            StarsCount: repo.repoStarsCount,
            Language: repo.buildLanguage,
            DateOfCreation: repo.dateOfCreation,
          };
          negCount = repo.repoStarsCount;
        }
      });
      return res.status(200).json(topRepo);
    } catch (err) {
      if (err instanceof UserNotFoundError) {
        return res.status(err.statusCode).json(err);
      }
      return res.status(500).json(err);
    }
  },
  getMostRecentRepositoryCommitAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      const repositoryDocument = await Repository.findById(user.GithubRepoId);
      if (!repositoryDocument) {
        throw new FailedToFetchDocumentFromDatabase(
          "Unable to fetch the document from the database"
        );
      }
      const currentDate = new Date();

      let mostRecentCommit = null;

      repositoryDocument.repositories.forEach((repo) => {
        repo.commit_history.forEach((commit) => {
          const commitDate = new Date(commit.commit_Date);
          const diffInDays =
            (currentDate.getTime() - commitDate.getTime()) / (1000 * 3600 * 24);

          if (
            mostRecentCommit === null ||
            diffInDays < mostRecentCommit.ageInDays
          ) {
            mostRecentCommit = {
              commitDate: commitDate,
              ageInDays: diffInDays,
              repoName: repo.name,
              commitData: commit,
            };
          }
        });
      });

      if (mostRecentCommit !== null) {
        res.status(200).json({ mostRecentCommit });
      } else {
        res.status(200).json({ message: "No commits found" });
      }
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToFetchDocumentFromDatabase
      ) {
        return res.status(err.statusCode).json(err);
      }
      res.status(500).json({ error: "An error occurred" });
    }
  },
  getTotalPullRequestCountAnalysis: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new UserNotFoundError(
          "This user does not exists in our database"
        );
      }
      const PullRequesData = await PullRequest.countDocuments();
      if (!PullRequesData) {
        throw new FailedToPerformCountOfDocuments(
          "Unable to fetch the document from the database and count them"
        );
      }
      if (PullRequesData === 0) {
        return res.status(200).json({
          Meesage:
            "There is no pull request created by you for any of your repository",
          Count: PullRequesData,
        });
      } else {
        return res.status(200).json({
          CountOfRepsitoryHavingPullRequest: PullRequesData,
        });
      }
    } catch (err) {
      if (
        err instanceof UserNotFoundError ||
        err instanceof FailedToPerformCountOfDocuments
      ) {
        return res.status(err.statusCode).json(err);
      }
      return res.status(500).json({ error: "An error occurred" });
    }
  },
};
