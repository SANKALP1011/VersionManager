class CustomApiErrors extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = CustomApiErrors;
