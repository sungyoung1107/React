// 파일명 : score.html, scoreserver.js

let http = require("http");
let fs = require("fs");
let ejs = require("ejs");

let scoreData = [
  { name: "홍길동", kor: 90, eng: 90, mat: 100 },
  { name: "임꺽정", kor: 80, eng: 60, mat: 60 },
  { name: "장길산", kor: 70, eng: 70, mat: 80 },
  { name: "강감찬", kor: 80, eng: 90, mat: 100 },
  { name: "이순신", kor: 100, eng: 100, mat: 100 },
];

let scoreserver = http.createServer((request, response) => {
  fs.readFile("./HTML/score.html", "utf-8", (error, data) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/html;charset=utf-8" });
      response.end("error");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(
      ejs.render(data, {
        scoreData: scoreData,
      })
    );
  });
});

scoreserver.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
