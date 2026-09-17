const data = require("./data.js");
const mongoDB = require("mongoose");
const User = require("../models/schema.js");

async function main() {
  await mongoDB.connect("mongodb://127.0.0.1:27017/newUser");
  await User.deleteMany({});
  await User.insertMany(data.data);
  mongoDB.disconnect();
}

main()
  .then((res) => {
    console.log("Data Saved");
  })
  .catch((err) => {
    console.log("Data Was Not Ssaved");
    console.log(err);
  });

// console.log(data.data);
