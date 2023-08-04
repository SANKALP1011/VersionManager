const CustomApiErrors = require("../Errors/customApi.error");

class FailedToPerformFollowerorFollowingCountAnalysis extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToPerformFollowerCountAnalysis";
    this.statusCode = 404;
  }
}

module.exports = { FailedToPerformFollowerorFollowingCountAnalysis };
