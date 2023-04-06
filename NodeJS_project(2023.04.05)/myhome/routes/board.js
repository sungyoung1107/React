let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");

// router.set("view engine", "ejs");
// router.use(express.urlencoded({ extended: false }));

/* http://127.0.0.1:3000/board */
/* GET home page. */
router.get("/", async function (req, res, next) {
  sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board`;
  let results = await commonDB.mysqlRead(sql, []);
  res.render("board/board_list.ejs", { boardList: results });
});

router.use("/view/:id", async function (req, res, next) {
  console.log("출력");
  let id = req.params.id;
  sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board where id = ${id}`;
  console.log(`${id}`);
  let results2 = await commonDB.mysqlRead(sql, []);
  res.render("board/board_view.ejs", { item: results2[0] });
});

// router.use("/write", (req, res) => {
//   res.render("board/board_write.ejs");
// });

// router.use("/board/save", (request, response) => {
//   let title = request.body.title;
//   let writer = request.body.writer;
//   let contents = request.body.contents;
//   sql1 = `select count(id) AS lg from tb_board`
//   let result3 = await commonDB.mysqlRead(sql1, []);
//   console.log(results3[0].length)

//   sql2 =`INSERT INTO tb_board(id, title, writer, contents, wdate)
//   VALUES (${boardList.length + 1},${title},${writer},${contents}, NOW());`

//   boardList.push({
//     id: boardList.length + 1,
//     title: title,
//     contents: contents,
//     writer: writer,
//     wdate: "2023-04-05",
//   });

//   response.redirect("/board/list");
// });

// 그 외 모든 요청에 대해서는 다음의 HTML 문서를 반환합니다.
// app.use((request, response) => {
//   // 응답 객체의 헤더는 key-value 형태의 객체이어야 한다.
//   // key-value는 응답 객체의 상태코드 + 헤더
//   response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
//   response.end(`<h1>게시판</h1>`);
// });

module.exports = router;
