// 서버단
var express = require("express"); // node_modules 폴더에 있으면 경로를 지정하지 않아도 된다.
var router = express.Router();
let commonDB = require("./commonDB"); // ./ 현재 위치를 말한다.

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("member/member_register", { title: "Express" });
});

// 아이디 중복체크 - 클라이언트로부터 아이디를 받는다.
// 받아온 아이디를 db에 가서 확인한다.
// 존재하면 fail을 사용자에게 보내주고, 존재하지 않아서 사용 가능하면 success를 반환한다.
router.use("/idcheck", async function (req, res, next) {
  let userid = req.body.userid; // 사용자 단에서 userid 받기
  let sql = `select count(*) cnt from tb_member where userid='${userid}'`;
  // let rows = await commonDB.mysqlRead(sql, []);
  let rows = await commonDB.mysqlRead(sql);
  let cnt = rows[0]["cnt"];
  if (cnt == 0) res.json({ result: "success" });
  else res.json({ result: "fail" });
});

// /member는 app에 연결되어 있는거라서 빼고 해야 한다
router.use("/save", async function (req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let username = req.body.username;
  let email = req.body.email;
  let phone = req.body.phone;
  let zipcode = req.body.zipcode;
  let address1 = req.body.address1;
  let address2 = req.body.address2;
  let nickname = req.body.nickname;
  console.log(password);
  let sql = `insert into tb_member (userid, password, username, email, phone, zipcode, address1, address2, nickname, wdate)
  values(?,?,?,?,?,?,?,?,?, now()) `;

  try {
    await commonDB.mysqlRead(sql, [
      userid,
      password,
      username,
      email,
      phone,
      zipcode,
      address1,
      address2,
      nickname,
    ]);
    res.json({ result: "success" });
  } catch (e) {
    console.log(e);
    res.json({ result: "fail" });
  }
});

// /member/login
// 경로가 /login 으로 같은 경우 get방식, post방식 다르게 해야 한다. use는 둘다 사용해야 가능하므로 사용하면 안된다.
router.get("/login", async function (req, res, next) {
  res.render("member/member_login.ejs");
});

router.post("/login", async function (req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  let sql = `select * from tb_member where userid='${userid}'`;
  let results = await commonDB.mysqlRead(sql); // 배열 반환
  if (results.length == 0) {
    res.json({ result: "fail", msg: "아이디가 없습니다" });
    return;
  }
  if (results[0]["password"] != password) {
    res.json({ result: "fail", msg: "패스워드가 일치하지 않습니다." });
    return;
  }

  // 세션에 사용자 정보 저장
  req.session["username"] = results[0]["username"];
  req.session["userid"] = results[0]["userid"];
  req.session["email"] = results[0]["email"];

  console.log(results[0]["username"]);
  console.log(results[0]["userid"]);
  console.log(results[0]["email"]);

  res.json({ result: "success", msg: "로그온 성공" });
});

// 내가 만든 것
router.use("/logingo", async function (req, res, next) {
  let userid = req.body.userid;
  let password = req.body.password;
  // console.log("유저아이디" + userid);
  // console.log("유저패스워드" + password);
  let sql_exists = `select EXISTS (select userid from tb_member where userid='${userid}')`;
  let sql = `select password from tb_member where userid='${userid}'`;

  try {
    let result_login = await commonDB.mysqlRead(sql);
    // console.log("출력1은" + result_login[0].password);
    // console.log("출력2은" + result_login[0]);
    let result_login2 = await commonDB.mysqlRead(sql_exists);
    let exists = Boolean(
      result_login2[0][
        "EXISTS (select userid from tb_member where userid='${userid}')"
      ]
    );
    // let exists = Boolean(result_login2[0]);
    console.log(exists);

    // if (exists === true) {
    //   console.log("id일치하였어요");
    if (result_login[0].password == password) {
      console.log("비번일치");
      res.json({ result: "success" });
    } else {
      console.log("비번불일치");
      res.json({ result: "fail_pw" });
    }
    // } else {
    //   console.log("id틀렸어요");
    //   res.json({ result: "fail_id" });
    // }
  } catch (e) {
    console.log("아예 에러");
    console.log(e);
    res.json({ result: "fail_id" });
  }
});

router.get("/put", async function (req, res, next) {
  let userid = req.query.userid;
  req.session["userid"] = userid;
  console.log(req.session["userid"]);
});

router.get("/logout", async function (req, res, next) {
  req.session["userid"] = "";
  req.session["username"] = "";
  req.session["email"] = "";
  res.redirect("/"); // 로그아웃하고 나면 index로 이동하기
});

module.exports = router;
