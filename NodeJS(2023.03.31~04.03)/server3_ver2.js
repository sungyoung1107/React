let http = require("http");
let fs = require("fs"); // 파일읽기
let url = require("url"); // url분석을 위한 라이블러

//http:127.0.0.1:4000?name=Tom&age=17
/*
    url: '/?name=Tom&age=17', // 전송 url
    method: 'GET', // 전송방식
*/

let server = http.createServer((request, response) => {
  let rurl = request.url;
  console.log(request.url); // 전송url // /?name=Tom&age=17
  console.log(request.method); // 전송방식 // GET
  //string 분석 -> json객체로 전환
  let query = url.parse(rurl, true).query;
  console.log(query); // [Object: null prototype] { name: 'Tom', age: '17' }

  if (query.name != "") {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(`이름 : ${query.name} 나이: ${query.age}`); // 웹출력
  }
});

server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
