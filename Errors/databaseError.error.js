const CustomApiErrors = require("./customApi.error");

class DatabaseError extends CustomApiErrors {
  constructor(message, code) {
    super(message, code);
  }
}

module.exports = DatabaseError;
