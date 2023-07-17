const Repository = require("../Model/UserRepo.Model");
const User = require("../Model/User.model");
const { getUserRepo } = require("../Github Service/repo.service");

module.exports = {
  getUserRepository: async (req, res) => {
    const userId = req.query.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({
          Error: "This user does not exist",
        });
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
      console.log(err);
      return res.status(500).json({
        Error: "Internal server error",
      });
    }
  },
};
