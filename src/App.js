import Header from "./components/common/Header";
import List from "./components/List/List";

function App() {
  return (
    <div className="app">
      <div className="todos">
        <Header />
        <List />
      </div>
    </div>
  );
}

export default App;
