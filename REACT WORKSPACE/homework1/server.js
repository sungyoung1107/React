const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.use("/", (request, response) => {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/api/scores", (req, res) => {
  console.log("여기까지 옴");
  let kor = req.body.kor;
  let eng = req.body.eng;
  let mat = req.body.mat;
  let data = {
    total: parseInt(kor) + parseInt(eng) + parseInt(mat),
    avg: (parseInt(kor) + parseInt(eng) + parseInt(mat)) / 3,
  };
  res.json({ data: data });
});

// 다른 url 처리 없을 때 기본값이다.
app.use((request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end("<H1>성적계산기</H1>");
});

app.listen(4000, function () {
  console.log("server start http://127.0.0.1:4000");
});
