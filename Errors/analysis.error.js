const CustomApiErrors = require("../Errors/customApi.error");

class FailedToPerformFollowerCountAnalysis extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToPerformFollowerCountAnalysis";
    this.statusCode = 404;
  }
}

module.exports = { FailedToPerformFollowerCountAnalysis };
