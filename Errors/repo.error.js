const CustomApiErrors = require("../Errors/customApi.error");

class FetchToFailRepositoriesError extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
  }
}

class FailtoFetchSingleRep extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
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
  FailtoFetchSingleRep,
};
