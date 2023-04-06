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
  // sql = "select * from tb_board";
  sql = `select id, title, writer, date_format(wdate, '%Y-%m-%d') wdate from tb_board`;

  let params = ["제목2", "임꺽정", "내용2"];
  connection.query(sql, (err, rows) => {
    if (err) console.log("err");
    else {
      console.log(rows);
    }

    connection.release(); // 연결 해제
  });
});

console.log("End");
