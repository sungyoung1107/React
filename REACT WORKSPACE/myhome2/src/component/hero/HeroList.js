import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; /* 압축버전 min 들어가있는 것을 쓰기 */
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import { Outlet, Link, NavLink } from "react-router-dom";

// 화면 구성을 담당할 함수
function HeroList(props) {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [searchType, setSearchType] = useState("");

  useEffect(() => {
    async function loadData() {
      const url = SERVERIP + "/hero/list";
      await axios
        .get(url)
        .then((res) => {
          setBoardList(res.data);
          setLoading(true);
          console.log(res.data);
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
        <h2>게시판 목록</h2> <br />
        <div className="input-group mb-3" style={{ marginTop: "20px" }}>
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            선택하세요
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                제목
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                내용
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                제목+내용
              </a>
            </li>
          </ul>
          <input type="text" className="form-control" placeholder="Search" />
          <button className="btn btn-secondary" type="submit">
            검색
          </button>
        </div>
        <table className="table table-hover ">
          <thead className="table-secondary">
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            {loading === true
              ? boardList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>
                        <Link to={"/hero/view/" + item.id}>
                          {item.hero_name}
                        </Link>
                      </td>
                      <td>{item.hero_desc}</td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </table>
      </div>
      <div>
        <br />
        <Link className="btn btn-dark" to="/hero/write">
          글쓰기
        </Link>
      </div>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href="#">
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item active">
            <a class="page-link" href="#">
              2
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              3
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeroList;
