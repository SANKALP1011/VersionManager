const CustomApiErrors = require("../Errors/customApi.error");

class UserNotFoundError extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
  }
}

class UserSignUpError extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
  }
}

class UserGithubOauthError extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
  }
}

module.exports = { UserNotFoundError, UserSignUpError, UserGithubOauthError };
