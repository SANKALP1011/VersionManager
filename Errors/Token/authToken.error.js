const CustomApiErrros = require("../customApi.error");

class FailedToVerifuAuthTokenError extends CustomApiErrros {
  constructor(message) {
    super(message);
    this.name = "FailedToVerifuAuthTokenError";
    this.statusCode = 404;
  }
}

module.exports = { FailedToVerifuAuthTokenError };
