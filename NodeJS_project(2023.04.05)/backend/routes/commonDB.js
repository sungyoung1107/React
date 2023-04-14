// board.js 에서 디비접근, member.js 디비접근 : DB에 데이터 읽고 쓰기 전문 코드
var mysql = require("mysql");
// 공통의 정보를 상수로 만든다. 변경하지 않는다.
const DBInfo = {
  connectionLimit: 10,
  host: "localhost",
  user: "USER01",
  password: "1234",
  database: "mydb",
  port: 3306,
};

let readpool = mysql.createPool(DBInfo);

// params는 선택적 매개변수임
// if (params === undefined) { params = []; }// 대체값 할당
// sql : 실행할 SQL 쿼리 문자열 / params : 쿼리의 매개변수 값들을 배열로 전달
async function mysqlRead(sql, params) {
  // promise 객체는 비동기적으로 실행되며
  // resolve 함수와 reject 함수를 인자로 갖는 콜백 함수를 받는다.
  let promise = new Promise((resolve, reject) => {
    readpool.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      conn.query(sql, params, (err, rows) => {
        console.log(sql);
        console.log(rows);
        if (err) reject(err);
        else resolve(rows);
        conn.release();
      });
    });
  });
  await promise;
  return promise;
}

exports.mysqlRead = mysqlRead;
exports.DBInfo = DBInfo;
