let http = require("http");
let fs = require("fs");

// createServer : 서버를 반환한다.
let server = http.createServer((request, response) => {
  // 브라우저 http://127.0.0.1:3000 서버로 엑세스 요청이 들어오면
  // request 객체 - 브라우저에서 요청한 정보를 담아오는 객체
  // response 객체 - 서버에서 클라이언트로 정보를 보낼 때
  // 정상적으로 보낼 때 200, Content-Type... 등 정보를 보내는 것이다.
  // 이경우는 html을 보내는 것

  fs.readFile("./HTML/index.html", (error, data) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
      response.end("error"); // 오류 상황임
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(data); // 파일 내용을 브라우저로 보낸다.
  });
});

server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});

// ctrl + c 종료!!!
