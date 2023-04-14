import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; /* 압축버전 min 들어가있는 것을 쓰기 */
import axios from "axios";
import { SERVERIP } from "../../CommonUtil";
import {
  Outlet,
  Link,
  NavLink,
  useNavigate,
  useParams,
} from "react-router-dom";

function HeroWrite(props) {
  const [heroName, setHeroName] = useState("");
  const [heroDesc, setHeroDesc] = useState("");

  let history = useNavigate();
  let { id } = useParams(); // 보내는 쪽에서 json 객체로 보냄

  useEffect(() => {
    console.log("id ", id);
    async function loadData() {
      let results = await axios.get(SERVERIP + "/hero/view/" + id);
      console.log("해당 id의 이름은" + results.data.hero.hero_name);
      console.log("해당 id의 업적은" + results.data.hero.hero_desc);

      setHeroName(results.data.hero.hero_name);
      setHeroDesc(results.data.hero.hero_desc);
    }

    if (id != undefined) loadData(); // write가 아니고 view를 호출할 때

    /* window.onload 역할이다
    BoardWrite 컴포넌트가 /board/write 일 때는 undefined가 오고
    /board/view/1 올 때 id가 파라미터 값으로 온다.
    */
  });

  const nameChange = (e) => {
    setHeroName(e.target.value);
  };

  const descChange = (e) => {
    setHeroDesc(e.target.value);
  };

  // 서버로 전송하기
  const postData = () => {
    // 데이터를 json으로 묶어서 보내야 한다.
    let data = { hero_name: heroName, hero_desc: heroDesc };

    axios
      .post(SERVERIP + "/hero/write", data)
      .then((res) => {
        console.log(res.data);
        history("/hero/list"); //redirect에 대응
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container">
      <h1>글쓰기</h1>
      <table className="table table-hover" style={{ marginTop: "20px" }}>
        <colgroup>
          <col width="25%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <td>이름</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  id="writer"
                  name="writer"
                  placeholder="이름"
                  onChange={nameChange}
                  value={heroName}
                  readonly
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>업적</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <textarea
                  className="form-control"
                  rows="5"
                  id="contents"
                  name="contents"
                  onChange={descChange}
                  value={heroDesc}
                  placeholder="내용을 입력하세요"
                ></textarea>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="container mt-3" style={{ textAlign: "right" }}>
        <Link className="btn btn-dark" onClick={postData}>
          등록
        </Link>
        &nbsp;&nbsp;
        <Link className="btn btn-dark">취소</Link>
      </div>
    </div>
  );
}

export default HeroWrite;
