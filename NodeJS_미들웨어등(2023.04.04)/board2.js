// Express.js 모듈을 불러옵니다.
var express = require("express");
// Express 애플리케이션을 생성합니다.
var app = express();
// 파일 시스템 모듈을 불러옵니다.
var fs = require("fs");
// EJS 템플릿 엔진 모듈을 불러옵니다.
var ejs = require("ejs");
// Express 애플리케이션의 뷰 엔진으로 EJS를 사용하도록 설정합니다.
app.set("view engine", "ejs");
// POST 방식으로 전송된 데이터를 파싱하기 위해 Body-parser 미들웨어를 사용합니다.
// express.urlencoded()는 Express.js의 미들웨어 함수 중 하나
// 이 함수는 클라이언트가 전송한 HTTP 요청의 본문(body)을 해석(parse)하여 req.body 객체로 만들어주는 역할
// 여기서 {extended: false}는 'querystring' 모듈을 사용하여 URL-encoded 데이터를 해석하는 것을 명시합니다.
// 만약, {extended: true}로 설정하면 'qs' 모듈을 사용하여 파싱합니다.
// 이 미들웨어는 POST 방식의 요청에서만 사용할 수 있으며, HTML <form> 태그에서
// 데이터를 전송할 때 사용하는 application/x-www-form-urlencoded 형식으로 전송된 데이터를 해석합니다.
// express.urlencoded() 미들웨어를 사용하면 request.body."name이름"과 같이 사용할 수 있습니다.
app.use(express.urlencoded({ extended: false }));
// 게시판 글 목록을 나타내는 기본 배열입니다.
let boardList = [
  { id: 1, title: "제목1", writer: "작성자1", wdate: "2023-04-04" },
  { id: 2, title: "제목2", writer: "작성자2", wdate: "2023-04-05" },
  { id: 3, title: "제목3", writer: "작성자3", wdate: "2023-04-06" },
  { id: 4, title: "제목4", writer: "작성자4", wdate: "2023-04-07" },
  { id: 5, title: "제목5", writer: "작성자5", wdate: "2023-04-08" },
];
/********************************************************/
/** express 모듈 자체가 use, get, post 함수 3개가 있음 **/
/** use : get, post가 오던 다 처리함 ********************/
/** get : get방식으로 온 것만 처리함 ********************/
/** post : post방식으로 온 것만 처리함 ******************/
/********************************************************/
// board/list로 요청이 들어오면 게시판 글 목록을 렌더링합니다.
// http://127.0.0.1:4000/board/list
app.use("/board/list", (request, response) => {
  // response.render()함수는 Express.js에서 사용되는 뷰엔진을 사용해 클라이언트에게 html을 렌더링하여 응답합니다.
  // board_list.ejs는 뷰 템플릿 파일의 경로를 의미하며 {boardList:boardList}는 뷰 템플릿에 전달할 데이터 객체
  // boardList 변수는 뷰 템플릿에서 반복문 등을 사용해 화면에 표시할 수 있습니다.
  response.render("board/board_list2.ejs", { boardList: boardList });
});
// board/view/:id로 요청이 들어오면 해당하는 게시글을 렌더링합니다.
app.use("/board/view/:id", (request, response) => {
  let id = request.params.id; // id를 받아온다.
  let item = boardList.filter((x) => {
    return id == x.id;
  }); // filter는 배열로 반환된다.
  console.log(item);
  response.render("board/board_view2.ejs", { item: item[0] });
});
// board/write로 요청이 들어오면 게시글을 작성하는 폼을 렌더링합니다.
app.use("/board/write", (request, response) => {
  response.render("board/board_write2.ejs");
});
// board/save POST 방식 요청이 들어오면 게시글을 작성하고 저장합니다.
app.use("/board/save", (request, response) => {
  let title = request.body.title;
  let contents = request.body.contents;
  let writer = request.body.writer;

  boardList.push({
    id: boardList.length + 1,
    title: title,
    contents: contents,
    writer: writer,
    wdate: "2023-04-05",
  });

  response.redirect("/board/list");
});
// 그 외 모든 요청에 대해서는 다음의 HTML 문서를 반환합니다.
app.use((request, response) => {
  // 응답 객체의 헤더는 key-value 형태의 객체이어야 한다.
  // key-value는 응답 객체의 상태코드 + 헤더
  response.writeHead(200, { "Content-type": "text/html;charset=utf-8" });
  response.end(`<h1>게시판</h1>`);
});
// 4000번 포트에서 서버를 시작합니다.
app.listen(4000, () => {
  console.log("Server start http://127.0.0.1:4000");
});

/**  별도 메모 **/
// http://127.0.0.1:4000/add?x=45&y=7
// app.get("/add", (request, response) => {
//   console.log(request.query);
//   let cal = {
//     x: request.query.x,
//     y: request.query.y,
//     "x+y": parseInt(request.query.x) + parseInt(request.query.y),
//   };
//   response.send(cal); //send 함수를 이용해 json 송신
// });

// http://127.0.0.1:4000/add/45/7
// app.get("/add/:x/:y", (request, response) => {
//   console.log(request.params);
//   let cal = {
//     x: request.params.x,
//     y: request.params.y,
//     "x+y": parseInt(request.params.x) + parseInt(request.params.y),
//   };
//   response.send(cal); //send 함수를 이용해 json 송신
// });

// response.end(), response.send() 차이점
