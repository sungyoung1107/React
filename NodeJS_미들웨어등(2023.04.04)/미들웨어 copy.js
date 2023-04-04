// 주소창에 /a를 입력하지 않아도 맨 밑의 app.use 미들웨어 함수가 실행되는 이유는
// app.use 함수가 등록된 순서대로 요청을 처리하기 때문입니다.
// 따라서 /a 경로와 /b 경로에 등록된 미들웨어 함수가 실행된 후에 맨 밑의 app.use 미들웨어 함수가 실행됩니다.

// 만약 /a 경로에 등록된 미들웨어 함수를 실행하고나서 요청 처리를 종료하고 싶다면,
// next() 대신 response.send() 함수를 사용하여 응답을 보내면 됩니다.

var express = require("express");
var app = express();

// http://127.0.0.1:4000

// 첫번째 미들웨어
app.get("/a", (request, response, next) => {
  // request 브라우저 -> 서버 (jason형식으로 온다.)
  // response 서버 -> 브라우저
  // next -> 다음 함수를 호출한다.
  console.log("aaaaaa");
  request.name = "홍길동";
  response.name = "John";
  next(); // 바로 밑에꺼 호출
});

// 두번째 미들웨어
app.get("/b", (request, response, next) => {
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
