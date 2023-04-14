import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; /* 압축버전 min 들어가있는 것을 쓰기 */
import { Outlet, Link, NavLink } from "react-router-dom";

// 화면 구성을 담당할 함수
function Layout(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-sm bg-warning navbar-dark">
        <div className="container-fluid">
          <ul className="navbar-nav">
            {/* anchor 말고, NavLink를 사용하자. 안그러면 페이지 전체가 로딩된다. */}
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/board/list">
                게시판
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/score/list">
                성적리스트
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/hero/list">
                영웅리스트
              </NavLink>
            </li>
          </ul>
          {/* component가 출력되는 위치 */}
        </div>
      </nav>
      <div style={{ marginTop: "30px" }} />
      <Outlet />
    </div>
  );
}

export default Layout;
