const CustomApiErrors = require("../Errors/customApi.error");

class FetchToFailRepositoriesError extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "RepositoriesNotFoundError";
    this.statusCode = 404;
  }
}

class FailtoFetchSingleRepoByName extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailtoFetchSingleRepByName";
    this.statusCode = 404;
  }
}

class FailedToGetRepoReadme extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToGetRepoReadme";
    this.statusCode = 404;
  }
}

class FailedToFetchRepoFromDatabase extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToFetchRepoFromDatabase";
    this.statusCode = 404;
  }
}

class FailedToFecthPullRequestResponse extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToFecthPullRequestResponse";
    this.statusCode = 404;
  }
}

module.exports = {
  FetchToFailRepositoriesError,
  FailedToFetchRepoFromDatabase,
  FailedToGetRepoReadme,
  FailtoFetchSingleRepoByName,
  FailedToFecthPullRequestResponse,
};
