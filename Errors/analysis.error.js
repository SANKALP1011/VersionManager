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

class FailedToPerformCountOfDocuments extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToPerformCountOfDocuments";
  }
}

module.exports = {
  FailedToPerformFollowerorFollowingCountAnalysis,
  FailedToPerformFollowwrToFollowingRation,
  FailedToPerformRepoCountAnalysis,
  FailedToPerformTopicCountsAnalysis,
};
