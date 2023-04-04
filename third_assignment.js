var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({ extended: false }));

// http://127.0.0.1:4000/form
app.get("/form", (request, response) => {
  fs.readFile("./third_assignment.html", "utf-8", (error, data) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.end("error");
      return;
    }
    // ejs.render() 함수를 사용하여 gugu.html에 temp 배열을 전달하여 HTML 코드를 생성합니다.
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(ejs.render(data));
  });
});

app.get("/result", (request, response) => {
  let sum =
    parseInt(request.query.kor) +
    parseInt(request.query.eng) +
    parseInt(request.query.mat);
  let avg = Math.floor(
    (parseInt(request.query.kor) +
      parseInt(request.query.eng) +
      parseInt(request.query.mat)) /
      3
  );
  let operator = parseInt(request.query.operator);

  // console.log(request.query.kor);
  // console.log(request.query.eng);
  // console.log(request.query.mat);
  // console.log(sum);
  // console.log(avg);

  if (operator == 1)
    response.send(
      `${request.query.name}님의 총점은 ${sum}점이고, 평균(소수점절사)은 ${avg}점입니다.`
    );
  else {
    response.end("error");
  }
});

app.use((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  response.end("<h1>성적확인프로그램</h1>");
});

app.listen(4000, function () {
  console.log("server start http://127.0.0.1:4000");
});
