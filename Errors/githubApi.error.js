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

module.exports = { FailedToFetchReposfromGithub, FailedToGetRepoPullRequest };
