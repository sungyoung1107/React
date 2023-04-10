var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
    session: req.session,
  }); /* 세션 정보를 뷰파일에서 적용하기 위함 */
});

module.exports = router;
