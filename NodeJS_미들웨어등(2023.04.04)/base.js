var express = require("express"); // npm install express
var app = express();
let fs = require("fs");
let ejs = require("ejs"); // npm install ejs

// ejs 엔진은 views 폴더 아래서 파일 찾는다. view engine으로 ejs 사용
app.set("view engine", ejs);
// ejs 미들웨어
app.use(express.urlencoded({ extended: false }));

app.use("/board/list", (request, response) => {
  response.render("board/board_list.ejs", { boardList: boardList });
});

app.use("/board/view/:id", (request, response) => {
  let id = request.params.id;
  let item = boardList.filter((x) => x.id == id);
  // return x.id == id;
  response.render("board/board_view.ejs", { item: item[0] });
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  response.end(`<h1>게시판</h1>`);
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
