import React, { useState } from "react";

function GuGudan2(props) {
  const [dan, setDan] = useState(4); // 단
  const [iList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [show, setShow] = useState(false); // show가 true일 때만 화면에 구구단 출력

  const danChange = (e) => {
    setShow(false); // show를 false로 해서 화면에 출력을 막음
    setDan(e.target.value);
  };

  const goConfirm = () => {
    setShow(true);
  };

  return (
    <div>
      단 : <input type="text" onChange={danChange}></input>
      <br />
      <button type="button" onClick={goConfirm}>
        확인
      </button>
      <br />
      <br />
      <ul>
        {show
          ? iList.map((item, index) => {
              return (
                <li key={index}>
                  {dan} X {item} = {dan * item}
                </li>
              );
            })
          : ""}
      </ul>
    </div>
  );
}

export default GuGudan2;
