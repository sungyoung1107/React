let http = require("http");
let fs = require("fs"); // 파일읽기
let url = require("url"); // url분석을 위한 라이블러

// console.log(http);
// console.log(fs);
// console.log(url);

//http:127.0.0.1:4000?name=Tom&age=17

// let server1 = http.createServer((request, response) => {
//   console.log(request.url);
//   console.log(response.method);
// });

// server1.listen(5000, () => {
//   console.log("server start http://127.0.0.1:5000");
// });

let server = http.createServer((request, response) => {
  console.log(request);
  /*
    url: '/?name=Tom&age=17', // 전송 url
    method: 'GET', // 전송방식
  */

  // console.log(request.url); // 전송url
  // console.log(request.method); // 전송방식
  //이 두가지를 출력해보고 작업해봅시다
  let rurl = request.url;

  // console.log(url.parse(rurl, true));

  let query = url.parse(rurl, true).query;
  console.log(query);
  //string 분석 -> json객체로 전환
  //파싱한다
  // console.log(query);
  if (query.name != "") {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(`이름: ${query.name} 나이:${query.age}`); // 웹출력
  }
});
server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
