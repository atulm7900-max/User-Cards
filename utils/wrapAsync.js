const ExpressError = require("./ExpressError.js");

module.exports = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(new ExpressError(500, err.message)));
  };
};
