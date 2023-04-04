var express = require("express"); // npm install express
var fs = require("fs"); // npm install fs
var ejs = require("ejs"); // npm install ejs

var app = express();

// bodyParse -- npm install bodyParser를 하고 해야 한다.
// 새버전에서는 express가 가지고 있다.
// post로 전송할 때 request.body에 보낸 정보를 추가해서
// 사용이 간편하도록 도와주는 미들웨어 이다.
app.use(express.urlencoded({ extended: false }));

// http://127.0.0.1:4000/guguform
app.get("/guguform", (request, response) => {
  fs.readFile("./html/guguform.html", "utf-8", (err, data) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(ejs.render(data));
  });
});

// http://127.0.0.1:4000/guguform
app.get("/gugu", (request, response) => {
  let dan = parseInt(request.query.dan);
  let result = "";
  // let temp = [];
  for (let i = 1; i < 10; i++) {
    // temp.push({ dan: dan, i: i, result: dan * i });
    result += `<p style="color:blue;font-size:14pt">${dan} * ${i} = ${
      dan * i
    }</p>`;
  }
  response.send(result);
  // response.send(temp);
});

app.use((request, response) => {
  response.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
  response.end(`<h1>구구단</h1>`);
});

app.listen(4000, () => {
  console.log("server start http://127.0.0.1:4000");
});
