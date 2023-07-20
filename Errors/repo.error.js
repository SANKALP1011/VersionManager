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
  constructor(message, code) {
    super(message, code);
  }
}

class FailedToFetchRepoFromDatabase extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
  }
}

module.exports = {
  FetchToFailRepositoriesError,
  FailedToFetchRepoFromDatabase,
  FailedToGetRepoReadme,
  FailtoFetchSingleRepoByName,
};
