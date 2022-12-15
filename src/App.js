import Header from "./components/common/Header";
import List from "./components/List/List";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <div className="app">
      <div className="container py-8 px-4">
        <TodoProvider>
          <Header />
          <List />
        </TodoProvider>
      </div>
    </div>
  );
}

export default App;
