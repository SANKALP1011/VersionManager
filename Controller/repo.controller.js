const Repository = require("../Model/UserRepo.Model");
const User = require("../Model/User.model");
const { getUserRepo } = require("../Github Service/repo.service");
const { UserNotFoundError } = require("../Errors/userAuth.error");

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
  getRepositoryByName: async (req, res) => {},
  getRepositoryPullRequest: async (req, res) => {},
  getRepositoryTopic: async (req, res) => {},
};
