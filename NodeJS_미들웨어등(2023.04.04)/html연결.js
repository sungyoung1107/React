var express = require("express"); // npm install express
var fs = require("fs");
var ejs = require("ejs"); // npm install ejs

var app = express();

// bodyParse -- npm install bodyParser를 하고 해야 한다.
// 새버전에서는 express가 가지고 있다.
// post로 전송할 때 request.body에 보낸 정보를 추가해서
// 사용이 간편하도록 도와주는 미들웨어 이다.
app.use(express.urlencoded({ extended: false }));

app.get("/input", (request, response) => {
  fs.readFile("./html/input.html", "utf-8", (err, data) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(ejs.render(data));
  });
});

app.get("/login", (request, response) => {
  let userid = request.query.userid; // input태그의 name 속성
  let password = request.query.password;

  if (userid == "test" && password == "1234") response.send("login success");
  else response.send("login fail");
});

// // 첫번째 미들웨어
// app.use((request, response, next) => {
//   // request 브라우저 -> 서버 (jason형식으로 온다.)
//   // response 서버 -> 브라우저
//   // next -> 다음 함수를 호출한다.
//   console.log("aaaaaa");
//   request.name = "홍길동";
//   response.name = "John";
//   next(); // 바로 밑에꺼 호출
// });

// // 두번째 미들웨어
// app.use((request, response, next) => {
//   console.log("bbbbbb");
//   request.phone = "010-0000-0001";
//   response.phone = "010-0000-1234";
//   request.address = "영등포";
//   response.address = "여의도";
//   next();
// });

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  response.end(`<h1>로그인시도</h1>`);
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
