import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

// 화면 구성을 담당할 함수
function Layout(props) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>{" "}
      {/* 메뉴 */}
      <hr />
      <Outlet /> {/* 각 컴포넌트의 내용이 뿌려질 위치 */}
    </div>
  );
}

export default Layout;
