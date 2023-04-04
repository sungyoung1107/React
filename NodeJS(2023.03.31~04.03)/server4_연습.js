// nodejs 는 실행하면서 읽는 인터프리터 언어이다!

let http = require("http");
let fs = require("fs");
let url = require("url");

//http:127.0.0.1:4000/add?x=4&y=5

let server = http.createServer((request, response) => {
  let rurl = request.url;
  let pathname = url.parse(rurl, true).pathname; // add
  let query = url.parse(rurl, true).query; // 쿼리는 제이슨 형식으로 온다. x, y

  if (pathname == "/add") {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    let x = parseInt(query.x);
    let y = parseInt(query.y);
    let z = x + y;
    response.end(`${x} + ${y} = ${z}`);
  } else {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end("존재하지 않는 url");
  }

  console.log(pathname); // add
  console.log(query); // { x: '4', y: '5' }
  console.log(typeof query);
});

server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
