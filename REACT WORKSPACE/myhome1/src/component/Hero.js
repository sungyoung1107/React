import React, { useState } from "react";

function Hero(props) {
  const [heroList, setHeroList] = useState([
    { id: 1, name: "홍길동", descr: "울도국 세움" },
    { id: 2, name: "이순신", descr: "임진왜란으로부터 나라를 구함" },
    { id: 3, name: "세종대왕", descr: "한글창제" },
    { id: 4, name: "강감찬", descr: "귀주대첩" },
  ]);

  const [hero, setHero] = useState({ name: "", descr: "" });

  const nameChange = (e) => {
    let h = hero; // 기존값 가져와서
    h.id = 999;
    h.name = e.target.value; // 새로 바꾸고
    setHero(h); // 설정

    // setHero({ name: e.target.value });
  };

  const descrChange = (e) => {
    let h = hero; // 기존값 가져와서
    h.descr = e.target.value; //새로바꾸고
    setHero(h); // 설정
    // setHero({ descr: e.target.value });
  };

  const goAppend = (e) => {
    console.log(hero);
    setHeroList(heroList.concat(hero));
    setHero({ name: "", descr: "" }); // 초기화 해줘야 한다.
  };

  // map 함수만 리턴값이 있다 ~
  return (
    <div>
      이름: <input type="text" onChange={nameChange}></input>
      <br />
      업적: <input type="text" onChange={descrChange}></input>
      <br />
      <button type="button" onClick={goAppend}>
        추가
      </button>
      <br />
      <br />
      <table>
        {heroList.map((hero, index) => {
          return (
            <tr key={index}>
              <td>{hero.id}</td>
              <td>{hero.name}</td>
              <td>{hero.descr}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Hero;
