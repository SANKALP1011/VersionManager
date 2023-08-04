const CustomApiErrors = require("../Errors/customApi.error");

class FailedToPerformFollowerorFollowingCountAnalysis extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToPerformFollowerCountAnalysis";
    this.statusCode = 404;
  }
}

class FailedToPerformFollowwrToFollowingRation extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToPerformFollowwrToFollowingRation";
    this.statusCode = 404;
  }
}

module.exports = {
  FailedToPerformFollowerorFollowingCountAnalysis,
  FailedToPerformFollowwrToFollowingRation,
};
