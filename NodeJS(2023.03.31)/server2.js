let http = require("http");

let server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" }); //jason 형식
  response.end("<h1>두번째 서버야</h1>");
});

server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});

// ctrl + c 종료!!!
