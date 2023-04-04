var express = require("express");
var fs = require("fs");
var ejs = require("ejs");
var app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/add", (request, response) => {
  fs.readFile("./html/addform.html", "utf-8", (error, data) => {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    response.end(ejs.render(data));
  });
});

app.get("/addAct", (request, response) => {
  let x = parseInt(request.query.x);
  let y = parseInt(request.query.y);
  let z = x + y;
  response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  response.end(`${x} 더하기 ${y}는 ${z}`);
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  response.end(`<h1>더하기</h1>`);
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
