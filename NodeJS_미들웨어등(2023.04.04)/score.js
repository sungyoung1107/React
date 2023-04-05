var express = require("express"); // npm install express
var app = express();
let fs = require("fs"); // npm install fs
let ejs = require("ejs"); // npm install ejs

// ejs 엔진은 views 폴더 아래서 파일 찾는다. view engine으로 ejs 사용
app.set("view engine", ejs);
// ejs 미들웨어
app.use(express.urlencoded({ extended: false }));

let scoreData = [{ id: 1, name: "홍길동", kor: 90, eng: 80, mat: 100 }];

// url은 서버 전체에서 유일 score/list
app.get("/score/list", (req, res) => {
  // views/score/score_list.ejs
  // express framework가 디자인 파일들은 views 폴더에 놓기로 약속
  // res.render()는 response 객체에 render라는 함수를 express에서 사용토록 했는데
  // 2개의 파라미터를 가진다.
  // 첫번째 변수 : html 파일(views/ 까지는 자동이기 때문에 그 뒤로 경로를 써준다.)
  // 두번째 변수 : 데이터를 jason 형태로 전달
  // 이 두개를 합해서 새로운 문서를 만들어 클라이언트로 전송한다.
  res.render("score/score_list.ejs", { scoreList: scoreData });
});

app.get("/score/view/:id", (req, res) => {
  let id = req.params.id;
  // filter는 조건을 만족하는 모든 데이터를 배열로 내보낸다.
  // let scoreItem = scoreData.filter((score) => {
  //   return score.id == id;
  // });
  // res.render("score/score_view.ejs", { score: scoreItem });

  // find는 조건을 만족하는 첫번째 데이터만 보낸다. (배열 아님)
  let scoreItem = scoreData.find((score) => score.id == id);
  res.render("score/score_view.ejs", { score: scoreItem });
});

app.get("/score/write", (req, res) => {
  res.render("score/score_write.ejs"); //링크 연결만
});

app.post("/score/save", (req, res) => {
  let id = scoreData[scoreData.length - 1].id + 1; // 제일 마지막에 있는 데이터의 id + 1 해야 한다.
  let name = req.body.name;
  let kor = parseInt(req.body.kor);
  let eng = parseInt(req.body.eng);
  let mat = parseInt(req.body.mat);
  // json으로 데이터를 만들어서 배열에 추가한다.
  data = { id: id, name: name, kor: kor, eng: eng, mat: mat };
  scoreData.push(data);
  // redirect 함수를 이용해서 /score/list 호출한다.
  res.redirect("/score/list");
});

app.get("/", (request, response) => {
  response.render("index.ejs");
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  response.end(`<h1>404 : Error</h1>`);
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
