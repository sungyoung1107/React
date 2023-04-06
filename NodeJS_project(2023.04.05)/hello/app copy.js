// 자주 사용하는 모듈 불러오기
// http 오류를 생성하는데 사용되는 모듈
var createError = require("http-errors");
// Express.js 프레임워크 모듈
var express = require("express");
// 파일 경로와 관련된 기능을 제공하는 모듈
var path = require("path");
// 쿠키 파싱을 처리하는 미들웨어
var cookieParser = require("cookie-parser");
// 로그를 기록하는 미들웨어
var logger = require("morgan");

// 라우팅 구현하기
// ./ 현재 디렉토리를 의미
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var guestRouter = require("./routes/guestbook"); // 모듈을 메모리로 가져온다.
var ajaxRouter = require("./routes/ajaxtest"); // 모듈을 메모리로 가져온다

var app = express();

// http://127.0.0.1:3000/ajax/ajaxtest1

/*** view engine setup(환경변수 설정) ***/
// 현대 디렉토리의 views 디렉토리를 뷰 파일이 저장될 경로로 설정
app.set("views", path.join(__dirname, "views"));
// 뷰 엔진으로 ejs를 사용하도록 설정
app.set("view engine", "ejs");

/*** 미들웨어 추가 ***/
// 로그를 콘솔에 출력하는 미들웨어
app.use(logger("dev"));
// HTTP 요청의 body를 파싱하는 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 쿠키를 파싱하는 미들웨어
app.use(cookieParser());
// static - image, css, js
// nodejs가 __(언더바2개) 시작하는 변수나 함수는 내장변수나 함수이다.
// __dirname : 내장변수, 현재 디렉토리 경로를 가지고 있다.
// path.join : path - 전체 디렉토리 경로에 대한 관리를 도와준다.
// join 합친다. path.join(__dirname, "public") c:/temp/public 형태로
// 전체 경로를 만들어 준다.
// window는 다음과 같이 경로를 지정할 때 c:\\temp\\public 역슬래시로 쓰는데, \가 escape 문자다 보니 \\ 이렇게
console.log(__dirname);
console.log(path.join(__dirname, "public"));
// express.static()은 인자로 전달된 디렉토리에 있는 정적 파일(img, css, js)을 제공합니다.
// 정적파일을 클라이언트에 제공하고자 함
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// url이 /guestbook으로 시작할 경우 guestRouter가 처리한다.
app.user("/guestbook", guestRouter);
app.use("/ajax", ajaxRouter);

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

// 외부에서 접근할 수 있도록 함
module.exports = app;

// npm install -g nodemon : 전역에 설치(아무데서나)
// npm install nodemon : 폴더에 설치
// nodemon start : 실행하는 것!
