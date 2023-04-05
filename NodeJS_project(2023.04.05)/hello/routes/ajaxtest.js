var express = require("express");
var router = express.Router(); // 라우터 생성

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("ajaxtest");
});

router.get("/ajaxtest1", function (req, res, next) {
  res.render("ajax/ajaxtest1");
});

router.get("/ajaxtest2", function (req, res, next) {
  res.render("ajax/ajaxtest2");
});

router.get("/ajaxtest3", (req, res, next) => {
  res.render("ajax/ajaxtest3");
});

// http://127.0.0.1:3000/ajax/add?x=3&y=8
router.use("/add", function (req, res, next) {
  x = parseInt(req.query.x);
  y = parseInt(req.query.y);
  z = x + y;
  // html을 연결시키면 안된다.
  res.json({ result: z });
});

router.use("/score", (req, res, next) => {
  kor = parseInt(req.query.kor);
  eng = parseInt(req.query.eng);
  mat = parseInt(req.query.mat);
  sum = kor + eng + mat;
  avg = Math.trunc(sum / 3);

  res.json({ sum: sum, avg: avg });
});

// send 함수가 적당히 알아서 데이터를 보낸다.
router.get("/result1", function (req, res, next) {
  res.send("data만 보낸다");
});

// 해줘야 사용 가능
module.exports = router;
