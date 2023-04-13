import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import About from "./component/About";
import Fortest1 from "./component/Fortest1";
import Fortest2 from "./component/Fortest2";
import GuGudan2 from "./component/GuGudan2";

function App() {
  return (
    <div className="App">
      <h1> 라우터 연습 </h1>
      {/* path= 가상 url 이고, element는 컴포넌트입니다. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 전체적인 Router 골격은 Layout 컴포넌트에 둘 것이므로 Layout is kind of homepage.*/
          /*  Outlet 컴포넌트는 중첩된 라우트 경로에 대한 뷰를 렌더링해줍니다. */}
          <Route index element={<Home />} />{" "}
          {/* /만 치면 Home/ 으로 가고, about 추가되면 About/으로 이동 */}
          <Route path="about" element={<About />} />
          <Route path="for1" element={<Fortest1 />} />
          <Route path="for2" element={<Fortest2 />} />
          <Route path="for3" element={<GuGudan2 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
