const { constants } = require("../constants");

const errorHandle = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(error);

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        messages: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.VALIDATION:
      res.json({
        title: "Validation Failed",
        messages: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        messages: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        messages: error.message,
        stackTrace: error.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        messages: error.message,
        stackTrace: error.stack,
      });
      break;
    default:
      console.log("No Error");
      break;
  }
};

module.exports = errorHandle;
