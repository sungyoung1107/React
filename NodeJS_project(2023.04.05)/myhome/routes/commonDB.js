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
//  if (params === undefined) { params = []; }// 대체값 할당
async function mysqlRead(sql, params) {
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
