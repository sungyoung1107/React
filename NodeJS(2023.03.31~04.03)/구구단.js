var express = require("express");
var app = express(); // 서버 만들었음

// http://127.0.0.1:4000/gugu?dan=4
// http://127.0.0.1:4000/gugu/4
app.get("/gugu/:dan", (request, response) => {
  // let dan = parseInt(request.query.dan); // 더하기가 아니라서 parseInt 안써도 된다.
  let dan = request.params.dan;
  let result = "";

  for (i = 1; i <= 9; i++) {
    result += `${dan} * ${i} = ${dan * i}<br/>`;
  }
  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  response.end(result);
  // response.end(result); // end는 한번만 가능하다. 두번 쓰면 에러이다.
  console.log(result);
});

app.use((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  response.end("<h1>구구단출력</h1>");
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
