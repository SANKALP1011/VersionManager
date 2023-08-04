const CustomApiErrors = require("../Errors/customApi.error");

class FailedToFetchReposfromGithub extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToFetchReposfromGithub";
    this.statusCode = 404;
  }
}

class FailedToGetRepoPullRequest extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToGetRepoPullRequest";
    this.statusCode = 404;
  }
}

class FailedToFetchRepositoryBranch extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToFetchRepositoryBranch";
    this.statusCode = 404;
  }
}

class FailedToFetchRespositoryIssues extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToFetchRespositoryIssues";
    this.statusCode = 404;
  }
}

class FailedToFetchRespoistoryCommitsList extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToFetchRespoistoryCommitsList";
    this.statusCode = 404;
  }
}

class FailedToFetchGithubFollowersCounts extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToFetchGithubFollowersCounts";
    this.statusCode = 404;
  }
}

class FailedToFetchGithubFollowingCounts extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToFetchGithubFollowingCounts";
    this.statusCode = 404;
  }
}

module.exports = {
  FailedToFetchReposfromGithub,
  FailedToGetRepoPullRequest,
  FailedToFetchRepositoryBranch,
  FailedToFetchRespositoryIssues,
  FailedToFetchRespoistoryCommitsList,
  FailedToFetchGithubFollowersCounts,
  FailedToFetchGithubFollowingCounts,
};
