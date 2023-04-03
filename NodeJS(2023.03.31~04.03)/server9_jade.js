let http = require("http");
let fs = require("fs");
let jade = require("jade");

let server = http.createServer((request, response) => {
  fs.readFile("./html/test3.jade", "utf-8", function (error, data) {
    console.log(data);
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    let fn = jade.compile(data);

    // 출력
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(fn());
  });
});

server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});

// ctrl + c 종료!!!

// .. --> 상위폴더
// . --> 나의 폴더

// ../ 상위 폴더
// ./ 현재 폴더
