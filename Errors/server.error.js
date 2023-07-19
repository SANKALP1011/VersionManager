const CustomApiErrors = require("../Errors/customApi.error");

class PortNotFreeError extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
  }
}

class ServerRunError extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
  }
}

module.exports = { PortNotFreeError, ServerRunError };
