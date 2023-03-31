let http = require("http");
let fs = require("fs"); // 파일 읽기
let url = require("url"); // url분석을 위한 라이블러

// http://127.0.0.1:4000?name=Tom&age=17

// request: 클라이언트->서버
// response : 서버->클라이언트
let server = http.createServer((request, response) => {
  console.log(request.url);
  console.log(request.method);
  response.end("<h1>Hello world</h1>"); // 응답은 해줘야 한다.
  // 클라이언트 요청이 있었는데 응답이 없으면 error
});

server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});

// let server = http.createServer((request, response) => {
//   // console.log(request);
//   console.log(request.url); // 전송url
//   console.log(request.method); // 전송방식

//   let rurl = request.url;
//   // String 분석 -> json객체로 전환.
//   // 파싱한다.
//   let query = url.parse(rurl, true).query;
//   // var pathName = url.parse(request.url).pathname;

//   console.log(query);
//   console.log(pathname);
//   console.log(query.name);

//   if (query.name != "") {
//     response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" }); //jason 형식
//     response.end(`이름 : ${query.name} 나이 : ${query.age}`);
//   }
// });

// ctrl + c 종료!!!
