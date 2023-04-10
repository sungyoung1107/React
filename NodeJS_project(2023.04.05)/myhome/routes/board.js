let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");
router.use(express.urlencoded({ extended: false }));

/* http://127.0.0.1:3000/board */
/* GET home page. */
router.get("/", async function (req, res, next) {
  let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board`;
  let results = await commonDB.mysqlRead(sql, []);
  res.render("board/board_list.ejs", { boardList: results });
});

router.use("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board where id = ${id}`;
  let results = await commonDB.mysqlRead(sql, []);
  res.render("board/board_view.ejs", { item: results[0] });
});

router.use("/write", (req, res) => {
  res.render("board/board_write.ejs");
});

router.use("/save", async function (req, res) {
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;
  let sql = `INSERT INTO tb_board(title, writer, contents, wdate)
  VALUES ('${title}','${writer}','${contents}', NOW())`;
  let results = await commonDB.mysqlRead(sql, [title, writer, contents]);
  console.log(results);
  res.redirect("/board");
});

router.use("/delete", async function (req, res) {
  let id = req.body.id;
  let sql = `delete from tb_board where id='${id}'`;
  let results = await commonDB.mysqlRead(sql, [id]);
  console.log(results);
  if (results === undefined) {
    res.json({ result: "fail" });
  } else if (results.affectedRows > 0) {
    res.json({ result: "success" });
  } else {
    res.json({ result: "fail" });
  }
});

router.use("/update/:id", async function (req, res) {
  let id = req.params.id; // params로 받는다. get 방식
  let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board where id = ${id}`;
  let results = await commonDB.mysqlRead(sql, []);
  res.render("board/board_update.ejs", { item: results[0] });
});

router.use("/updateGo", async function (req, res) {
  let id = req.body.id;
  let title = req.body.title;
  let contents = req.body.contents;
  let sql = `update tb_board set title='${title}', contents='${contents}' where id=${id}`;
  let results = await commonDB.mysqlRead(sql);

  if (results === undefined) {
    alert("실패");
    res.redirect("/board");
    // res.json({ result: "fail" });
  } else if (results.affectedRows > 0) {
    alert("성공");
    res.redirect("/board");
    // res.json({ result: "success" });
  } else {
    alert("실패");
    res.redirect("/board");
    // res.json({ result: "fail" });
  }
});

router.use("/address", (req, res) => {
  res.render("board/address.ejs");
});

router.get("/list/:pg", async function (req, res, next) {
  let pg = parseInt(req.params.pg);
  console.log(pg);
  // pg=1 0   (pg-1)*10
  // pg=2 10  (pg-1)*10
  // pg=3 20  (pg-1)*10

  // 전체 데이터 갯수 확인
  sql = `SELECT count(*) cnt
  from tb_board A
  LEFT OUTER JOIN (Select @rownum:=0) B ON 1=1
  LEFT OUTER JOIN tb_member C ON A.writer = C.userid
  `;

  results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

  sql = `SELECT A.id, A.title, A.writer, A.num, A.username,
  date_format(A.wdate, '%Y-%m-%d') wdate
  from
  (
  select A.id, A.title, A.writer, A.wdate , C.username, @rownum:=@rownum +1 num
  from tb_board A
  LEFT OUTER JOIN (Select @rownum:=0) B ON 1=1
  LEFT OUTER JOIN tb_member C ON A.writer = C.userid
  order by id
  ) A
  limit ${(pg - 1) * 10}, 10`;

  results = await commonDB.mysqlRead(sql, []);
  console.log(results);
  res.render("board/board_list", {
    session: req.session,
    boardList: results,
    totalCnt: totalCnt,
    pg: pg,
    paging: commonUtil.getPaging(pg, totalCnt),
  });
});

module.exports = router;
