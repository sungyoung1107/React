import React, { useState } from "react";

function Score(props) {
  const [name, setName] = useState("");
  const [kor, setKor] = useState(0);
  const [eng, setEng] = useState(0);
  const [mat, setMat] = useState(0);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);

  let mystyle = {
    color: "grey",
    backgroundColor: "lightyellow",
    fontSize: "14pt",
    padidng: "10px 5px 10px 5px",
    width: "100px",
  };

  let btnstyle = {
    colot: "grey",
    backgroundColor: "lightyellow",
    fontSize: "15pt",
  };

  const nameChange = (e) => {
    // console.log("이름은" + e.target.value);
    setName(e.target.value);
  };

  const korChange = (e) => {
    // console.log("국어성적은" + e.target.value);
    setKor(e.target.value);
  };

  const engChange = (e) => {
    // console.log("영어성적은" + e.target.value);
    setEng(e.target.value);
  };

  const matChange = (e) => {
    // console.log("수학성적은" + e.target.value);
    setMat(e.target.value);
  };

  const calculateScore = () => {
    setTotal(parseInt(kor) + parseInt(eng) + parseInt(mat));
    setAvg(Math.floor((parseInt(kor) + parseInt(eng) + parseInt(mat)) / 3));
  };

  return (
    <div>
      <br />
      <hr></hr>
      <br />
      <h1>성적 계산기</h1>
      <br />
      <br />
      학생이름 입력: <input
        style={mystyle}
        type="text"
        onChange={nameChange}
      />{" "}
      <br />
      <br />
      국어성적 입력: <input
        style={mystyle}
        type="text"
        onChange={korChange}
      />{" "}
      <br />
      <br />
      영어성적 입력: <input
        style={mystyle}
        type="text"
        onChange={engChange}
      />{" "}
      <br />
      <br />
      수학성적 입력: <input
        style={mystyle}
        type="text"
        onChange={matChange}
      />{" "}
      <br />
      <br />
      <br />
      <button type="button" style={btnstyle} onClick={calculateScore}>
        성적계산
      </button>
      <br />
      <br />
      <div>
        이름은 {name} 총점은 {total} 평균(소수점 절사)은 {avg} 입니다.
      </div>
      <br />
      <br />
    </div>
  );
}

export default Score;
