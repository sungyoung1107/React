import logo from "./logo.svg";
import "./App.css";
import Iftest1 from "./component/iftest1";
import Fortest1 from "./component/Fortest1";
import Fortest2 from "./component/Fortest2";
import Hero from "./component/Hero";
import GuGudan from "./component/GuGudan";
import GuGudan2 from "./component/GuGudan2";
import HeroList from "./component/HeroList";
import HeroWrite from "./component/HeroWrite";

// yarn start
function App() {
  return (
    <div className="App">
      {/* <Iftest1 /> */}
      {/* <Fortest1 /> */}
      {/* <Fortest2 /> */}
      {/* <Hero /> */}
      {/* <GuGudan /> */}
      {/* <GuGudan2 /> */}
      <HeroWrite />
      <HeroList />
    </div>
  );
}

export default App;
