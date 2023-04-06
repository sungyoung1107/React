var express = require("express");
// 라우터 객체를 생성합니다.
var router = express.Router();

/* GET home page. */
// / 경로에 대한 GET 요청이 들어왔을 때 실행되는 콜백 함수를 등록합니다.
// req(요청 객체), res(응답 객체), next(다음 미들웨어 함수)
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// 해당 라우팅 모듈을 외부로 노출합니다.
module.exports = router;
