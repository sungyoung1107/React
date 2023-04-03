// nodejs 는 실행하면서 읽는 인터프리터 언어이다!

let http = require("http");
let fs = require("fs"); // 파일 읽기
let url = require("url");

//http:127.0.0.1:4000/add?x=4&y=5
let server = http.createServer((request, response) => {
  // console.log(request);
  /*
    url: '/?name=Tom&age=17', // 전송 url
    method: 'GET', // 전송방식
  */
  // console.log(request.url); // 전송url
  console.log(request.method); // 전송방식

  //이 두가지를 출력해보고 작업해봅시다

  let rurl = request.url;
  let pathname = url.parse(rurl, true).pathname; // add
  let query = url.parse(rurl, true).query; // 쿼리는 제이슨 형식으로 온다. x, y

  console.log(pathname); // add
  console.log(query); // { x: '4', y: '5' }
  console.log(typeof query);

  //string 분석 -> json객체로 전환
  //파싱한다

  if (pathname == "/add") {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    let x = parseInt(query.x);
    let y = parseInt(query.y);
    let z = x + y;
    response.end(`${x} + ${y} = ${z}`); // 웹출력
  } else {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end("존재하지 않는 url");
  }
});
server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
