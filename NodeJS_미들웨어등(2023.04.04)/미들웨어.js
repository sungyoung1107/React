var express = require("express");
var app = express();

// http://127.0.0.1:4000/a

// 첫번째 미들웨어
app.use((request, response, next) => {
  // request 브라우저 -> 서버 (jason형식으로 온다.)
  // response 서버 -> 브라우저
  // next -> 다음 함수를 호출한다.
  console.log("aaaaaa");
  request.name = "홍길동";
  response.name = "John";
  next(); // 바로 밑에꺼 호출
});

// 두번째 미들웨어
app.use((request, response, next) => {
  console.log("bbbbbb");
  request.phone = "010-0000-0001";
  response.phone = "010-0000-1234";
  request.address = "영등포";
  response.address = "여의도";
  next();
});

app.use((request, response, next) => {
  response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
  console.log(request.name);
  console.log(response.name);
  console.log(request.phone);
  console.log(request.address);
  response.end(`<h1>${request.name}</h1>`);
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
