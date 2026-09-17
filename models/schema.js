const mongoBD = require("mongoose");
const Schema = mongoBD.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 40,
  },

  dept: {
    type: String,
    required: true,
  },

  salary: {
    type: Number,
    default: 20000,
  },
});

let User = mongoBD.model("NewUser", userSchema);

module.exports = User;
