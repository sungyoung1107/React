var express = require("express");
var app = express(); // 서버 만들었음

app.get("/gugu", (request, response) => {
  let dan2 = request.query.dan;
  // console.log(dan);
  let i = 1;
  let result;
  let temp = [];
  for (i = 1; i < 10; i++) {
    result = parseInt(dan2) * i;
    temp += { dan: dan2, i: i, result: result };
    console.log(temp);
  }
  console.log(temp.dan, temp.i, temp.result);
  response.send(temp.dan, temp.i, temp.result);
});

app.use((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<H1>Express</H1>");
});

app.listen(4000, function () {
  console.log("server start http://127.0.0.1:4000");
});
