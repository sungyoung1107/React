let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
router.use(express.urlencoded({ extended: false }));

/* http://127.0.0.1:3000/board */
/* GET home page. */
router.get("/", async function (req, res, next) {
  sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board`;
  let results = await commonDB.mysqlRead(sql, []);
  res.render("board/board_list.ejs", { boardList: results });
});

router.use("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  sql = `select id, title, writer, contents, date_format(wdate, '%Y-%m-%d') wdate from tb_board where id = ${id}`;
  console.log(`${id}`);
  let results2 = await commonDB.mysqlRead(sql, []);
  res.render("board/board_view.ejs", { item: results2[0] });
});

router.use("/write", (req, res) => {
  res.render("board/board_write.ejs");
});

router.use("/save", async function (req, res) {
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;

  sql = `INSERT INTO tb_board(title, writer, contents, wdate)
  VALUES ('${title}','${writer}','${contents}', NOW())`;

  let result3 = await commonDB.mysqlRead(sql, [title, writer, contents]);
  console.log(result3);
  res.redirect("/board");
});

module.exports = router;
