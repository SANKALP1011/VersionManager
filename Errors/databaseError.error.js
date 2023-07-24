const CustomApiErrors = require("./customApi.error");

class DatabaseError extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
  }
}

class FailedToSaveDocumentToDatabase extends CustomApiErrors {
  constructor(message) {
    super(message);
    this.name = "FailedToSaveDocumentToDatabase";
    this.statusCode = 404;
  }
}

module.exports = { DatabaseError, FailedToSaveDocumentToDatabase };
