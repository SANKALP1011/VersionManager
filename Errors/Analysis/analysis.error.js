const CustomApiErrors = require("../customApi.error");

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

class FailedToPerformRepoCountAnalysis extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToPerformRepoCountAnalysis";
    this.statusCode = 404;
  }
}

class FailedToPerformTopicCountsAnalysis extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToPerformTopicCountsAnalysis";
  }
}

class FailedToGetPushEventDataAnalysis extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToGetPushEventDataAnalysis";
    this.statusCode = 404;
  }
}

module.exports = {
  FailedToPerformFollowerorFollowingCountAnalysis,
  FailedToPerformFollowwrToFollowingRation,
  FailedToPerformRepoCountAnalysis,
  FailedToPerformTopicCountsAnalysis,
  FailedToGetPushEventDataAnalysis,
};
