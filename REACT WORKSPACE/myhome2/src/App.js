import logo from "./logo.svg";
import "./App.css";

// import { Routes, Route, Outlet, Link } from "react-router-dom";
// 윗코드는 밑으로 내려가야 한다.
import Layout from "./layout/Layout"; // ./ 이거는 src이다.
import Home from "./component/Home"; // ./ 이거는 src이다.
import BoardList from "./component/board/BoardList";
import BoardWrite from "./component/board/BoardWrite";
import ScoreList from "./component/score/ScoreList";
import HeroList from "./component/hero/HeroList";
import HeroWrite from "./component/hero/HeroWrite";

// App.js에 들어가서 환경설정 import Router를 해줘서 Router를 꽂아서 쓰자!
import { Routes, Route, Outlet, Link } from "react-router-dom"; // import 구문 수정

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/board/list" element={<BoardList />} />
          <Route path="/board/write" element={<BoardWrite />} />
          <Route path="/board/view/:id" element={<BoardWrite />} />

          <Route path="/score/list" element={<ScoreList />} />

          <Route path="/hero/list" element={<HeroList />} />
          <Route path="/hero/write" element={<HeroWrite />} />
          <Route path="/hero/view/:id" element={<HeroWrite />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
