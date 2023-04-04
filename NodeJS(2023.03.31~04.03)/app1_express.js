// Express는 Node.js에서 가장 널리 사용되는 웹 프레임워크 중 하나입니다.
// Node.js로 웹 어플리케이션을 개발할 때 필요한 기능들을 이미 구현해놓고 제공하기 때문에,
// 개발자는 직접 구현할 필요 없이 빠르고 간단하게 웹 어플리케이션을 개발할 수 있습니다.

// Express는 미들웨어(Middleware)를 이용해 클라이언트로부터 요청을 받고,
// 이 요청에 대해 적절한 응답을 하는 것을 가능하게 해줍니다.

// 또한, RESTful API를 지원하며, 템플릿 엔진과 연동하여 동적인 HTML 페이지를 생성할 수 있습니다.
// 간단한 서버 구현부터 대규모 웹 어플리케이션까지 다양한 프로젝트에서 사용됩니다.

var express = require("express");
var app = express(); // 서버 만들기
// express 모듈 자체가 use, get, post 함수 3개가 있음
// use : get, post가 오던 다 처리함
// get : get방식으로 온 것만 처리함
// post : post방식으로 온 것만 처리함

/***** url ("/test") 없는 코드가 밑에 와야 한다. *****/

// get, post 상관 없이 불러와진다.
app.use("/test", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<h1>use</h1>");
});

// get인 경우만 불러와진다.
app.get("/get", (request, repsonse) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<h1>get</h1>");
});

// get인 경우만 불러와진다.
app.get("/userinfo", (request, response) => {
  let userinfo = { name: "Tom", phone: "010-0000-0000" };
  response.send(userinfo); // send 함수를 이용해서 json 데이터 송신
});

// http://127.0.0.1:4000/userinfo2?name=Jane&phone=01000000000
// get인 경우만 불러와진다.
app.get("/userinfo2", (request, response) => {
  // request.params.name; 이거 아님
  console.log(request.query); // .name
  let userinfo = { name: request.query.name, phone: request.query.phone };
  response.send(userinfo); // send 함수를 이용해서 json 데이터 송신
});

// get방식 - 새롭게 추가된 url 방식
// http://127.0.0.1:4000/userinfo3/Brown/user01
app.get("/userinfo3/:username/:userid", (request, response) => {
  // request.params.name; 이거 아님
  console.log(request.params); // .name
  let userinfo = {
    name: request.params.username,
    phone: request.params.userid,
  };
  response.send(userinfo); // send 함수를 이용해서 json 데이터 송신
});

// post인 경우만 불러와진다.
app.post("/post", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<H1>POST</H1>");
});

// 다른 url 처리 없을 때 기본값이다.
app.use((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<H1>Express</H1>");
});

app.listen(4000, function () {
  console.log("server start http://127.0.0.1:4000");
});
