var express = require("express");
var app = express(); // 서버 만들었음
let fs = require("fs");
let ejs = require("ejs"); // npm install ejs

// app.set("view engine", "ejs"); // view engine으로 ejs 사용

app.get("/gugu", (request, response) => {
  // gugu 경로로 GET 요청이 들어오면 다음 함수가 실행됩니다.
  // 요청 파라미터로부터 dan 변수를 받아와서 구구단을 계산한 결과를 객체 형태로 만들어서 temp 배열에 넣습니다.
  let dan = request.query.dan;
  // console.log(dan);
  let i = 1;
  let result;
  let temp = [];
  for (i = 1; i < 10; i++) {
    result = parseInt(dan) * i;
    temp.push({ dan: dan, i: i, result: result });
    console.log(temp);
  }

  // fs 모듈을 사용하여 HTML/gugu.html 파일을 읽어옵니다.
  fs.readFile("./HTML/gugu.html", "utf-8", (error, data) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
      response.end("error"); // 오류 상황임
      return;
    }

    // ejs.render() 함수를 사용하여 gugu.html에 temp 배열을 전달하여 HTML 코드를 생성합니다.
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(
      ejs.render(data, {
        gugudan: temp,
      })
    ); // ejs render
  });
});

// 마지막으로 app.use() 함수를 사용하여 모든 요청에 대해 처리할 콜백 함수를 등록합니다. 이 콜백 함수는 response.end("<H1>Express</H1>")을 호출하여 "Express"라는 제목을 가진 HTML 페이지를 반환합니다.
app.use((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<H1>Express</H1>");
});

// 마지막으로 app.listen() 함수를 호출하여 4000번 포트에서 서버를 시작합니다.
app.listen(4000, function () {
  console.log("server start http://127.0.0.1:4000");
});

// 즉, 웹 브라우저에서 http://localhost:4000/gugu?dan=2와 같은 요청을 보내면 gugu.html 파일 내에 계산 결과가 담긴 HTML 코드를 반환하는 서버가 실행됩니다.

// app.set("view engine", "ejs")은 Express 애플리케이션에서 EJS (Embedded JavaScript)를 사용하도록 설정하는 기능입니다.
// EJS는 HTML 내에 JavaScript 코드를 삽입할 수 있게 해주는 템플릿 엔진으로, Node.js에서 많이 사용됩니다.

// 이 설정을 하면, .ejs 확장자를 가진 템플릿 파일들을 자동으로 렌더링할 수 있습니다.
// 예를 들어, res.render("mypage")를 호출하면 Express는 views/mypage.ejs 파일을 자동으로 찾아서 렌더링합니다.

// 또한 app.set("views", "myviews")와 같이 설정하면, Express는 myviews 폴더에서 템플릿 파일들을 찾습니다.
// 이러한 방식으로, Express에서 템플릿 엔진을 사용하면, 웹 애플리케이션의 개발과 유지보수를 쉽게 할 수 있습니다.
