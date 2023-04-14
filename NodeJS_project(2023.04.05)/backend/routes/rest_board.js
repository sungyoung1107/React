// 서버단
let express = require("express"); // node_modules 폴더에 있으면 경로를 지정하지 않아도 된다.
let router = express.Router();
let commonDB = require("./commonDB"); // ./ 현재 위치를 말한다.
let commonUtil = require("./commonUtil");
router.use(express.urlencoded({ extended: false }));

/*
  subquery:
  - select(결과셋이 하나 또는 0일 때 가능)
  - from(인라인뷰)
  - where절은 드물다.
  조인->서브쿼리-(캐쉬가 된다)->함수(함수가 제일 느림, 캐쉬 불가능)
  nested loop join => for문 돌려서 조인을 한다. 10이전 버전
  hash join => 양쪽 테이블의 join 컬럼을 기준으로 해쉬 테이블을 만들어 조인한다 (엄청빠름)
  선형 검색(n번 비교), 이진 검색(데이터가 순서대로 있을 때), 해쉬검색(젤 빠름)
  */

// 게시글 상세보기
router.use("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let sql = `select A.id, A.title, A.writer, A.contents, date_format(A.wdate, '%Y-%m-%d') wdate,
  (select username from tb_member B where A.writer=B.userid) username from tb_board A where id=${id}`;

  let results = await commonDB.mysqlRead(sql, []);
  console.log("게시판 상세보기 결과의 길이는" + results.length); // results에 자료가 안나오면 [] 이다.
  if (results.length == 0) {
    res.json({ result: "fail", msg: "해당하는 데이터를 찾을 수 없습니다" });
  }

  console.log("게시판 상세보기 결과는 " + results[0]);
  res.json({ result: "success", msg: "", boardData: results[0] }); // 한개만 나올거니까 0번째 배열을 boardData에 던져준다.
});

// 게시글 쓰기
router.post("/write", async function (req, res, next) {
  checkInfos = [
    { key: "title", type: "str", range: 40 },
    { key: "writer", type: "str", range: 40 },
    { key: "contents", type: "str", range: -1 },
  ];
  //수행결과 값이 0이면 문제 없는 것이고 다른 숫자가 온다. (오류임)
  insertInfo = commonUtil.checkInfo(req, checkInfos);
  if (insertInfo["result"] != 0) {
    res.json({ insertInfo });
    return;
  }

  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;

  let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
  results = await commonDB.mysqlRead(sql, []);
  if (results[0]["cnt"] == 0) {
    res.json({ result: "fail", msg: "해당하는 아이디가 없습니다" });
    return;
  }

  sql = `
  insert into tb_board (title, writer, contents, wdate)
  values('${title}', '${writer}', '${contents}', NOW() )`;

  await commonDB.mysqlRead(sql, []);

  res.json({ result: "success", msg: "등록성공" });
});

// http://127.0.0.1:9090/rest_board/save
// 게시글 올리기
router.post("/save", async function (req, res, next) {
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;
  let sql = `
            insert into tb_board (title, writer, contents, wdate)
            values(?, ?, ?, NOW() )`;
  try {
    if (title === undefined)
      return res.json({ result: "fail", msg: "title을 채워주세요" });
    if (writer === undefined)
      return res.json({ result: "fail", msg: "writer을 채워주세요" });
    if (contents === undefined)
      return res.json({ result: "fail", msg: "contents을 채워주세요" });
    await commonDB.mysqlRead(sql, [title, writer, contents]);
    res.json({ result: "success", msg: "등록성공" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail", msg: "등록실패" });
  }
});

// 완료
// "/rest_board/list/1"
// http://localhost:9090/rest_board/list -- x (안된다)
// http://localhost:9090/rest_board/list/1
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
  // 한 함수 내에서 res.json 호출하고, 또 다시 res.send나 render나 json 호출을 못한다.
  res.json({
    boardList: results,
    totalCnt: totalCnt,
    pg: pg,
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
