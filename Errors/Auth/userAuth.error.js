const CustomApiErrors = require("../customApi.error");

class UserNotFoundError extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError";
    this.statusCode = 404;
  }
}

class UserSignUpError extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "UserSignUpError";
    this.statusCode = 404;
  }
}

class UserGithubOauthError extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "UserGithubOauthError";
    this.statusCode = 404;
  }
}

module.exports = { UserNotFoundError, UserSignUpError, UserGithubOauthError };
