let http = require("http"); // 브라우저에서 받기 위한 객체 (클라이언트->서버)
http
  .createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/html" }); //jason 형식
    response.end("<h1>Hello my first Webserver!!!!!</h1>");
  })
  .listen(4000, () => {
    console.log("server start http://127.0.0.1:4000");
  });

// 서버는 서비스를 제공하는 장비에 붙이는 의미
// ctrl + c 종료!!!

// let http = require("http");

// http
//   .createServer((request, response) => {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.end("<h1>Hello my first Webserver</h1>");
//   })
//   .listen(4000, () => {
//     console.log("server start http://127.0.0.1:4000");
//   });
