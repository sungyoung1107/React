import React, { useState } from "react";

// props 사용하던 말던 기본 매개변수로 사용하자.
// /> 닫기 태그 반드시 해줘야 한다.
function Inputtest(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");

  // 일반 함수는 생성자에서 바인딩이라는 작업을 해줘야 한다.
  // 함수에서는 생성자를 쓰지 않는다. 그래서 람다를 쓴다.
  // 람다함수
  const nameChange = (e) => {
    // 인자가 발생한 이벤트에 대한 모든 정보
    // console.log(e.target.value); // 키를 누른 값이 저장되어 있다.
    setName(e.target.value);
  };

  const ageChange = (e) => {
    // 인자가 발생한 이벤트에 대한 모든 정보
    // console.log(e.target.value); // 키를 누른 값이 저장되어 있다.
    setAge(e.target.value);
  };

  const emailChange = (e) => {
    // 인자가 발생한 이벤트에 대한 모든 정보
    // console.log(e.target.value); // 키를 누른 값이 저장되어 있다.
    setEmail(e.target.value);
  };

  let mystyle = {
    color: "grey",
    backgroundColor: "lightyellow",
    fontSize: "20pt",
    padidng: "10px 5px 10px 5px",
    // radius: "10px",
  };

  return (
    <div>
      이름:{" "}
      <input
        type="text"
        onChange={nameChange}
        style={{ color: "red", backgroundColor: "lightblue" }}
      />
      <br />
      나이: <input style={mystyle} type="text" onChange={ageChange} />
      <br />
      이메일: <input type="text" onChange={emailChange} />
      <br />
      <p>
        {name} {age} {email}
        {/* <h3>이름 : {name}</h3>
        <h3>나이 : {age}</h3>
        <h3>이메일 : {email}</h3> */}
      </p>
    </div>
  );
}

export default Inputtest;
