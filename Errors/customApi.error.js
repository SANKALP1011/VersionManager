class CustomApiErrors extends Error {
  constructor(message, code) {
    super(message, code);
  }
}

module.exports = CustomApiErrors;
