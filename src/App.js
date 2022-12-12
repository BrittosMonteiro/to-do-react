import Header from "./components/common/Header";
import List from "./components/List/List";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <div className="app">
      <div className="todos">
        <TodoProvider>
          <Header />
          <List />
        </TodoProvider>
      </div>
    </div>
  );
}

export default App;
