const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoBD = require("mongoose");
const User = require("./models/schema.js");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const { schema } = require("./schema.js");

app.use(methodOverride("_method"));
app.set("view engin", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

async function main() {
  await mongoBD.connect("mongodb://127.0.0.1:27017/newUser");
}

main()
  .then((res) => {
    console.log("Connection Establiched");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/users", async (req, res) => {
  let users = await User.find();
  res.render("show.ejs", { users });
});

app.get(
  "/users/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;

    let user = await User.findById(id);
    if (!user.name) {
      throw new ExpressError(500, "Invalid Id");
    }
    res.render("view.ejs", { user });
  }),
);

app.post(
  "/users",
  wrapAsync(async (req, res) => {
    let result = schema.validate(req.body);
    console.log(result);
    let newUser = new User(req.body);
    await newUser.save();
    console.log("Data Saved to DB");

    res.redirect("/users");
  }),
);

app.get("/users/:id/edit", async (req, res) => {
  let { id } = req.params;
  let user = await User.findById(id);
  res.render("edit.ejs", { user });
});

app.patch("/users/:id", async (req, res) => {
  let { id } = req.params;
  let editDetail = req.body;

  let updatedUser = await User.findByIdAndUpdate(id, editDetail, {
    new: true,
    runValidators: true,
  });

  console.log(updatedUser);
  res.redirect(`/users/${id}`);
});

app.delete("/users/:id", async (req, res) => {
  let { id } = req.params;
  let delUser = await User.findByIdAndDelete(id);
  console.log(delUser);
  res.redirect("/users");
});

app.all("/{:splat}", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  if (err.message === "Cannot read properties of null (reading 'name')") {
    err.message = "Id Not Found";
  }
  let { statusCode = 500, message } = err;
  res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log(`Server is Live on ${port}`);
});
