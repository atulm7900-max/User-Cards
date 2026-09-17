const joi = require("joi");

module.exports.schema = joi.object({
  name: joi.string().required().max(50),
  dept: joi.string().required().max(50),
  salary: joi.number().required(),
});
