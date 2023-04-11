// 서버단
let express = require("express"); // node_modules 폴더에 있으면 경로를 지정하지 않아도 된다.
let router = express.Router();
let commonDB = require("./commonDB"); // ./ 현재 위치를 말한다.
let commonUtil = require("./commonUtil");
router.use(express.urlencoded({ extended: false }));

/* http://127.0.0.1:3000/board */
/* GET home page. */

/* pg is not defined */
// 기본인데 활용 X
router.get("/", async function (req, res, next) {
  let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board`;
  let results = await commonDB.mysqlRead(sql, []);
  // 앞에 views/ 이부분이 생략 되어 있다.
  // 첫번째 인자로 전달되는 문자열은 뷰 템플릿 파일의 경로를 나타냄
  res.render("board/board_list.ejs", { boardList: results });
});

// 게시글 상세보기
router.use("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  console.log(id);
  if (!id) {
    // id 값이 누락된 경우, 400 Bad Request 에러를 응답으로 전송
    return res.status(400).send("id 값이 누락되었습니다.");
  }
  let sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board where id = ${id}`;
  let results = await commonDB.mysqlRead(sql, []);
  console.log(results[0]);
  res.render("board/board_view.ejs", { item: results[0] });
});

// 게시글 쓰기
router.use("/write", (req, res) => {
  if (req.session["userid"]) {
    // 사용자 정보가 있으면
    res.render("board/board_write.ejs", { session: req.session });
  } else {
    // 사용자 정보가 없으면
    res.redirect("/member/login"); // 로그인 페이지로 이동
  }
});

// 게시글 올리기
router.use("/save", async function (req, res) {
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;
  let pg = 1; // 일단 1로 세팅 (나중에 바꿔주기)
  let sql = `INSERT INTO tb_board(title, writer, contents, wdate)
  VALUES ('${title}','${writer}','${contents}', NOW())`;
  let results = await commonDB.mysqlRead(sql, [title, writer, contents]);
  res.redirect(`/board/list/${pg}`);
});

// http://127.0.0.1:3000/board/list/1 1~10
// http://127.0.0.1:3000/board/list/2 11~20
router.get("/list/:pg", async function (req, res, next) {
  console.log("로그인정보는" + req.session["userid"]); // 세션객체만 이용하면 된다!
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

  results = await commonDB.mysqlRead(sql, []); // 배열로 반환이 됨
  let totalCnt = results[0]["cnt"]; // 배열의 첫번째 값(0)에서 컬럼은 cnt

  // 최근 글이 올라오도록 함. order by id desc
  sql = `SELECT A.id, A.title, A.writer, A.num, A.username,
  date_format(A.wdate, '%Y-%m-%d') wdate
  from
  (
  select A.id, A.title, A.writer, A.wdate , C.username, @rownum:=@rownum +1 num
  from tb_board A
  LEFT OUTER JOIN (Select @rownum:=0) B ON 1=1
  LEFT OUTER JOIN tb_member C ON A.writer = C.userid
  order by id desc
  ) A
  limit ${(pg - 1) * 10}, 10`;

  results = await commonDB.mysqlRead(sql, []); // id, title, writer, num, username, wdate
  console.log(results); // 1~10 목록, 11~20 목록이 나옴
  console.log("응답세션은 " + req.session);
  res.render("board/board_list", {
    session: req.session,
    boardList: results,
    totalCnt: totalCnt,
    pg: pg,
    paging: commonUtil.getPaging(pg, totalCnt),
  });
});

router.use("/delete", async function (req, res) {
  let id = req.body.id;
  let sql = `delete from tb_board where id='${id}'`;
  let results = await commonDB.mysqlRead(sql, [id]);
  console.log(results);
  if (results === undefined) {
    res.json({ result: "fail" });
  } else if (results.affectedRows > 0) {
    // 처리한 행이 0보다 큰 경우
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
  console.log(results);

  if (results === undefined) {
    // res.redirect(`/board/view/${id}`);
    res.json({ result: "fail" });
  } else if (results.affectedRows > 0) {
    // res.redirect(`/board/view/${id}`);
    res.json({ result: "success" });
  } else {
    // res.redirect(`/board/view/${id}`);
    res.json({ result: "fail" });
  }
});

router.use("/address", (req, res) => {
  res.render("board/address.ejs");
});

module.exports = router;
