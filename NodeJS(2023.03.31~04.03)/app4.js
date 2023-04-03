/***********************/
/******** 정리 *********/
/***********************/

// get 방식의 경우 ?x=4&y=5 request.query.x
// get 방식의 경우 /4/5 request.params.x
// post 방식인 경우 app.use(express.urlencoded({extended:false})); 가 선행되고 나면 request.body.x 로 처리한다.

var express = require("express");
var app = express(); // 서버 만들었음
var ejs = require("ejs");
var fs = require("fs");

// app.set("view engine", ejs); // 내부변수에 값을 설정한다.
// 미들웨어를 사용한다.
// body parser 모듈이 있는데 모듈을 설치하고
// express 자체적으로
// body에 데이터를 가져온다.
app.use(express.urlencoded({ extended: false }));
// 미들웨어, app 객체를 만들고 다른 url 처리시

app.get("/", (request, response) => {
  fs.readFile("HTML/index.html", "utf-8", (error, data) => {
    response.send(data.toString());
  });
});

// app.post("/add", (request, response) => {
//   let x = request.body.x;
//   let y = request.body.y;
//   let z = parseInt(x) + parseInt(y);

//   response.send({ x: x, y: y, z: z });
// });

app.use((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<H1>Express</H1>");
});

app.listen(4000, function () {
  console.log("server start http://127.0.0.1:4000");
});
