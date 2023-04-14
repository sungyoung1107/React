// 서버단
let express = require("express"); // node_modules 폴더에 있으면 경로를 지정하지 않아도 된다.
let router = express.Router();
let commonDB = require("./commonDB"); // ./ DB정보는 스키마 score로 가져온다.
router.use(express.urlencoded({ extended: false }));

/* http://127.0.0.1:3000/score */
/* GET home page. */

/* 기본 페이지 */
// router.get("/list", async function (req, res, next) {
//   let sql = `select id, user_name, kor, eng, mat from tb_score`;
//   let results = await commonDB.mysqlRead(sql, []);
//   console.log(results);
//   res.json({ scoreList: results });
// });

module.exports = router;
