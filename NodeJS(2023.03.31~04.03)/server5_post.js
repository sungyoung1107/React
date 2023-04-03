let http = require("http");

// createServer : 서버를 반환한다.
let server = http.createServer((request, response) => {
  // 브라우저 http://127.0.0.1:4000 서버로 엑세스 요청이 들어오면
  // request 객체 - 브라우저에서 요청한 정보를 담아오는 객체
  // response 객체 - 서버에서 클라이언트로 정보를 보낼 때
  // 정상적으로 보낼 때 200, Content-Type... 등 정보를 보내는 것이다.
  // 이경우는 html을 보내는 것

  if (request.method == "POST") {
    // header가 먼저 가고, body 정보 수신
    // body에서 오는 정보 수신하기

    let body = "";
    // request의 on "data"
    request.on("data", (data) => {
      body += data;
      // body를 타고 오는 data를 수신한다.
    });

    // 데이터 수신 종료하면
    request.on("end", () => {
      // body 변수에 그동안 수신한 데이터가 있다.
      let postData = new URLSearchParams(body);
      let name = postData.get("name");
      let age = postData.get("age");

      let temp = `<h1>post</h1>
      <h3>${name} ${age}</h3>`;
      response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      response.end(temp);
    });
  } else {
    response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" }); //jason 형식
    response.end("<h1>GET</h1>");
  }
});

server.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});

// ctrl + c 종료!!!
