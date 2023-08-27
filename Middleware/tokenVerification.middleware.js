const jwt = require("jsonwebtoken");
const {
  FailedToVerifuAuthTokenError,
} = require("../Errors/Token/authToken.error");

const AuthToken = (req, res, next) => {
  const token = "VER123";
  let tokenHeader = req.get("authorization");
  if (tokenHeader) {
    tokenHeader = tokenHeader.slice(7);
    jwt.verify(tokenHeader, token, (err, decodedToken) => {
      if (err) {
        throw new FailedToVerifuAuthTokenError(
          "Unable to verify your json web token"
        );
      } else {
        req.decoded = decodedToken;
        next();
      }
    });
  } else {
    return res.status(500).json({
      Message: "You are not authenticated to access the route",
    });
  }
};
module.exports = AuthToken;
