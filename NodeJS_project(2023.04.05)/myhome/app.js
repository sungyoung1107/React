let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const session = require("express-session");
const MYSQLSTORE = require("express-mysql-session")(session);
const DBInfo = require("./routes/commonDB"); // DB 정보를 주어야 세션을 저장시킬 수 있다.

let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");
let boardRouter = require("./routes/board");
let memberRouter = require("./routes/member");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// console.log(DBInfo.DBInfo);
let sessionStore = new MYSQLSTORE(DBInfo.DBInfo);
app.use(
  session({
    key: "session_key",
    secret: "asfafwhwlgnwawfeagwrhwkrngwkrzzz",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

// 미들웨어 - 모든 웹상의 요청이 거쳐간다.
app.use("/", indexRouter);
app.use("/users", usersRouter);
// url이 /board으로 시작할 경우 boardRouter가 처리한다.
app.use("/board", boardRouter);
// url이 /member 시작할 경우 memberRouter가 처리한다.
app.use("/member", memberRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
