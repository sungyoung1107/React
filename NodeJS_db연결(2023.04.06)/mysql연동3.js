var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "USER01", // 대소문자 유의!
  password: "1234",
  database: "mydb",
  port: 3306,
});

// db와 연결
pool.getConnection(function (err, connection) {
  // db와 연결을 성공하면 매개변수로 전달된 함수가 호출
  // err- db와 연결 실패시
  if (err) {
    console.log(err);
    return;
  }

  // 연결 성공시 연결객체 Connection을 전달한다
  // 연결 객체
  console.log("connection success");
  // sql = `select id, title, writer, date_format(wdate, '%Y-%m-%d') wdate from tb_board`;

  let promise = new Promise((resolve, result) => {
    sql = `insert into tb_board(title, writer, contents, wdate) values(?,?,?,now())`;
    let params = ["제목2", "임꺽정", "내용2"];
    // insert를 하려면 두번째 들어갈 매개변수가 있어야 함(params)
    connection.query(sql, params, (err, rows) => {
      if (err) reject("db 오류");
      else {
        resolve("success"); // then 구문으로 이동
      }
    });
    // connection.release(); // 연결 해제
  })
    .then((result) => {
      sql = "select * from tb_board";
      connection.query(sql, (err, rows) => {
        if (err) console.log("err");
        else {
          console.log(rows);
        }
        // connection.release(); // 연결 해제
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

console.log("End");

// 비동기의 단점은 코드가 순차적으로 처리되지 못하다보니
// 밑의 코드가 먼저 실행이 될 수도 있다는 점이다.
