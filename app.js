const express = require("express");
const app = express();
const db = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const path = require("path");
const OwnersRouter = require("./routes/OwnersRouter");
const ProductsRouter = require("./routes/ProductsRouter");
const UsersRouter = require("./routes/UsersRouter");
const IndexRouter = require("./routes/index");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET || "mySuperSecretKey123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      secure: false, // true only if using HTTPS
    },
  })
);

app.use(flash());
//Routes
app.use("/", IndexRouter);
app.use("/owners", OwnersRouter);
app.use("/users", UsersRouter);
app.use("/products", ProductsRouter);

app.listen(3000, () => {
  console.log("Server is running");
});
