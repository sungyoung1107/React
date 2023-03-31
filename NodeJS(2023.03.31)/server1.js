let http = require("http");
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
