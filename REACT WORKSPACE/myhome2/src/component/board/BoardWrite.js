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

function BoardWrite(props) {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [writer, setWriter] = useState("");

  let history = useNavigate(); // 링크 가기 위해서
  let { id } = useParams(); // 보내는 쪽에서 json 객체로 보냄

  useEffect(() => {
    console.log("id는 ", id);
    async function loadData() {
      let results = await axios.get(SERVERIP + "/rest_board/view/" + id);

      console.log("해당 제목은" + results.data.boardData.title);
      console.log("해당 내용은" + results.data.boardData.contents);
      console.log("해당 작성자는" + results.data.boardData.writer);

      setTitle(results.data.boardData.title);
      setContents(results.data.boardData.contents);
      setWriter(results.data.boardData.writer);
    }

    if (id != undefined) loadData(); // write가 아니고 view를 호출할 때

    /* window.onload 역할이다
    BoardWrite 컴포넌트가 /board/write 일 때는 undefined가 오고
    /board/view/1 올 때 id가 파라미터 값으로 온다.
    */
  });

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const contentsChange = (e) => {
    setContents(e.target.value);
  };

  const writerChange = (e) => {
    setWriter(e.target.value);
  };

  // 서버로 전송하기
  const postData = () => {
    // 데이터를 json으로 묶어서 보내야 한다.
    let data = { title: title, contents: contents, writer: writer };

    axios
      .post(SERVERIP + "/rest_board/write", data)
      .then((res) => {
        console.log(res.data);
        history("/board/list"); //redirect에 대응
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
            <td>제목</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="제목"
                  onChange={titleChange}
                  value={title}
                  // readonly
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>작성자</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  id="writer"
                  name="writer"
                  placeholder="이름"
                  onChange={writerChange}
                  value={writer}
                  // readonly
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>내용</td>
            <td>
              <div className="mb-3" style={{ marginTop: "13px" }}>
                <input
                  type="text"
                  className="form-control"
                  id="contents"
                  name="contents"
                  placeholder="내용"
                  onChange={contentsChange}
                  value={contents}
                />
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

export default BoardWrite;
