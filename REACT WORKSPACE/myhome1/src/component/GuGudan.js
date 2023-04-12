import React, { useState } from "react";

function GuGudan(props) {
  const [guguList, setGuguList] = useState([]); // 배열 초기화
  const [dan, setDan] = useState("1"); // 1단으로 초기화

  // 몇단할 것인지 단을 설정해준다.
  const danChange = (e) => {
    setDan(e.target.value); // 단을 설정한다. // dan 값이 바뀐다.
  };

  const goGuGu = (e) => {
    const danNum = parseInt(dan, 10); // dan을 danNum에 할당
    const newGuguList = []; // 새로운 배열 생성
    for (let i = 1; i <= 9; i++) {
      const result = danNum * i;
      newGuguList.push({ dan: danNum, x: i, result: result });
    }
    setGuguList(newGuguList);
  };

  // map 함수만 리턴값이 있다 ~
  return (
    <div>
      몇단을 출력하시겠습니까? <input type="text" onChange={danChange}></input>
      <br />
      <button type="button" onClick={goGuGu}>
        구구단 go!
      </button>
      <br />
      <br />
      <table>
        {guguList.map((gugu, index) => {
          return (
            <tr>
              <td>
                {gugu.dan} * {gugu.x}
              </td>
              <td>=</td>
              <td>{gugu.result}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default GuGudan;
