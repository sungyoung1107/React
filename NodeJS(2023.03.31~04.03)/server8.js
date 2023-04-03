let http = require("http");
let fs = require("fs");
let ejs = require("ejs"); // npm install ejs

let boardList = [
  { id: 1, title: "제목1", writer: "작성자1", wdate: "2023-04-03" },
  { id: 2, title: "제목2", writer: "작성자2", wdate: "2023-04-04" },
  { id: 3, title: "제목3", writer: "작성자3", wdate: "2023-04-05" },
  { id: 4, title: "제목4", writer: "작성자4", wdate: "2023-04-06" },
  { id: 5, title: "제목5", writer: "작성자5", wdate: "2023-04-07" },
];

// createServer : 서버를 반환한다.
let server = http.createServer((request, response) => {
  // 브라우저 http://127.0.0.1:3000 서버로 엑세스 요청이 들어오면
  // request 객체 - 브라우저에서 요청한 정보를 담아오는 객체
  // response 객체 - 서버에서 클라이언트로 정보를 보낼 때
  // 정상적으로 보낼 때 200, Content-Type... 등 정보를 보내는 것이다.
  // 이경우는 html을 보내는 것

  fs.readFile("./HTML/test2.html", "utf-8", (error, data) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
      response.end("error"); // 오류 상황임
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(
      ejs.render(data, {
        boardList: boardList,
      })
    ); // ejs render
    // response.end(data);

    // ejs 렌더링 엔진을 통해서 html과 node.js의 데이터를 결합한다.
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
