// HeroList.js - 백앤드 서버로부터 데이터 가져온다.
// axios - 설치 필요 - npm install axios

import React, { useState, useEffect } from "react";
import axios from "axios";

function HeroList(props) {
  const [heroList, setHeroList] = useState([]); // heroList는 초기화가 []로 배열형태 이다.
  const [loading, setLoading] = useState(false); // 데이터를 수신하면 true로 바꿔준다.

  // useState 함수가 값을 초기화 해주면 해당 값을 저장할 변수와 해당값을 변경하는 함수를 반환함
  // 배열을 저장할 변수 반환, 배열값을 변환할 함수 주소

  // 첫번째 매개변수 - mount 될때, update 될때, unmount 될때 호출된다.
  // [] - 변수 : 변수들이 바뀔 때 호출된다.
  // useEffect 훅을 사용하여 API를 호출하고, heroList에 업데이트 합니다.
  // useEffect는 컴포넌트가 렌더링 될 때마다 실행되는 함수
  // 첫번째 인수는 실행할 콜백 함수, 두번째 인수는 의존성 배열
  // 이 콜백함수는 서버에서 데이터를 가져와서 setHeroList를 사용하여 heroList 상태를 업데이트
  useEffect(() => {
    // 서버에서 데이터를 불러온다.
    // console.log("호출된다.");
    // setHeroList(
    //   heroList.concat([
    //     { id: 1, name: "이순신", descr: "임진왜란 승리" },
    //     { id: 2, name: "이뭉치", descr: "임진왜란 승리" },
    //     { id: 3, name: "김넛지", descr: "임진왜란 승리" },
    //   ])
    // );

    // Promise 기반 컴포넌트라서
    axios
      .get("http://localhost:9090/hero/list")
      .then((res) => {
        console.log("**********");
        console.log(res);
        console.log(res.data);
        setHeroList(res.data);
        setLoading(true); // 데이터가 불러와지면 true로 바꿔준다.
      })
      .catch((res, status, error) => {
        console.log(status);
      });
  }, []);

  return (
    <div>
      <table>
        {loading === true
          ? heroList.map((item, index) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.hero_name}</td>
                  <td>{item.hero_desc}</td>
                </tr>
              );
            })
          : ""}
      </table>
    </div>
  );
}

export default HeroList;
