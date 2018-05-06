const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const moment = require("moment");

//custom modules
const { mongoose } = require("./mongoose");

const Idea_route = require("./routes/ideas");
const User_route = require("./routes/users");

require("./config/passport")(passport);

let app = express();

const port = process.env.PORT || 5000;

//middlewares
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("formatDate", (date, format) => {
  return moment(date).format(format);
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(methodOverride("_method"));

//Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(__dirname + "/public"));

// Home route
app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Welcome"
  });
});

// About Route
app.get("/about", (req, res) => {
  res.render("about");
});

app.use("/ideas", Idea_route);
app.use("/users", User_route);

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
