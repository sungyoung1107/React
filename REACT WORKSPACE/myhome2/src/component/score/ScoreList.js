import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; /* 압축버전 min 들어가있는 것을 쓰기 */
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";

// 화면 구성을 담당할 함수
function ScoreList(props) {
  const [scoreList, setScoreList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const url = SERVERIP + "/score/list";
      await axios
        .get(url)
        .then((res) => {
          setScoreList(res.data.scoreList);
          setLoading(true);
          console.log(res.data.scoreList); // 배열형태
          console.log(res.data);
          console.log(loading);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    loadData();
  }, []);

  return (
    <div>
      <div className="container">
        <h2>성적 리스트</h2>
        <table className="table table-hover ">
          <thead className="table-secondary">
            <tr>
              <th>순번</th>
              <th>이름</th>
              <th>국어성적</th>
              <th>영어성적</th>
              <th>수학성적</th>
              <th>합계</th>
              <th>평균</th>
            </tr>
          </thead>
          <tbody>
            {loading === true
              ? scoreList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.user_name}</td>
                      <td>{item.kor}</td>
                      <td>{item.eng}</td>
                      <td>{item.mat}</td>
                      <td>{item.kor + item.eng + item.mat}</td>
                      <td>
                        {Math.floor((item.kor + item.eng + item.mat) / 3)}
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreList;
