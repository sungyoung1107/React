import logo from "./logo.svg";
import "./App.css";
import HelloComponent from "./component/HelloComponent";
import Counter from "./component/Counter";
import Score from "./component/Score";

function App() {
  return (
    <div className="App">
      <h1 className="title">제목</h1>
      <HelloComponent />
      <Counter />
      <Score />
    </div>
  );
}

export default App;
