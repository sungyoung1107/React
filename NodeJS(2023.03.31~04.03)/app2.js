var express = require("express");
var app = express(); // 서버 만들었음

// express 모듈 자체가 use, get, post 함수 3개가 있음
// use : get, post가 오던 다 처리함
// get : get방식으로 온 것만 처리함
// post : post방식으로 온 것만 처리함

/***** url ("/test") 없는 코드가 밑에 와야 한다. *****/
// get, post 상관 없이 불러와진다.

// http://127.0.0.1:4000/add?x=45&y=7
// http://127.0.0.1:4000/add/45/7

// app.get("/add", (request, response) => {
//   console.log(request.query);
//   let cal = {
//     x: request.query.x,
//     y: request.query.y,
//     "x+y": parseInt(request.query.x) + parseInt(request.query.y),
//   };
//   response.send(cal); //send 함수를 이용해 json 송신
// });

app.get("/add", (request, response) => {
  x = request.query.x;
  y = request.query.y;
  z = parseInt(request.query.x) + parseInt(request.query.y);
  response.send({ x: x, y: y, z: z }); //send 함수를 이용해 json 송신
});

// app.get("/add/:x/:y", (request, response) => {
//   console.log(request.params);
//   let cal = {
//     x: request.params.x,
//     y: request.params.y,
//     "x+y": parseInt(request.params.x) + parseInt(request.params.y),
//   };
//   response.send(cal); //send 함수를 이용해 json 송신
// });

app.get("/add/:x/:y", (request, response) => {
  // console.log(request.params);
  x = request.params.x;
  y = request.params.y;
  z = parseInt(request.params.x) + parseInt(request.params.y);
  response.send({ x: x, y: y, z: z }); //send 함수를 이용해 json 송신
});

app.use((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<H1>Express</H1>");
});

app.listen(4000, function () {
  console.log("server start http://127.0.0.1:4000");
});
