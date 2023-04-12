import React, { useState } from "react";
import axios from "axios";

function HeroWrite(prop) {
  const [hero_name, setHeroName] = useState("");
  // useState 함수가 문자열 변수랑 변수값 바꾸는 함수를 만들어서 배열 형태로 전달한다.
  const [hero_desc, setHeroDesc] = useState("");

  // input 태그에 값이 바뀌면 이 함수가 호출된다.
  const heroNameChange = (e) => {
    setHeroName(e.target.value);
  };

  // input 태그에 값이 바뀌면 이 함수가 호출된다.
  const heroDescChange = (e) => {
    setHeroDesc(e.target.value);
  };

  // form 태그를 써서 서버로 전송할 때 <button>태그에 type="button" 속성이 없으면
  // 버튼을 누를 때 submit() 함수가 호출된다.
  // submit 함수가 호출되면 form 태그에 onSubmit 이벤트 핸들러가 호출된다.
  // 이 때 잡아 채서 서버에 전송하는 처리를 한다.
  // onSubmit함수의 경우 무조건 서버로 전송을 한다.
  // 이걸 막기 위해서 preventDefault()함수를 호출한다.
  const onSubmit = (e) => {
    e.preventDefault();
    // form 태그를 통해 서버에 정보를 전송 전에 호출된다.
    // 버튼의 기본 기능을 정지시킨다.
    // submit 버튼의 submit 기능을 막고, 별도의 처리를 한다.

    // Spring은 데이터가 문자열로 와야 받는다.
    // Axios는 json으로 데이터를 주고 받는다.
    axios
      .post("http://localhost:9090/hero/write", {
        hero_name: hero_name,
        hero_desc: hero_desc,
      })
      .then((res) => {
        console.log(res.data.result);
        // 서버에서 글쓰기가 성공적으로 처리된 후에 새로운 리스트를 불러온다.
        window.location.reload(); // 화면 다시 불러오기 // 보통 리액트에서 쓰지는 않는다.
        // location 객체는 원래 존재하는데 부모가 윈도우
        // react가 아니면 location.reload()만 호출해도 되는데
        // react는 window.locaion.reload()로 호출해라
      })
      .catch((error) => {
        console.log(error);
      });

    // setHeroName("");
    // setHeroDesc("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>영웅</h3>
        이름 : <input type="text" onChange={heroNameChange}></input> <br />
        업적 : <input type="text" onChange={heroDescChange}></input> <br />
        <button>추가</button>
      </form>
    </div>
  );
}

export default HeroWrite;
