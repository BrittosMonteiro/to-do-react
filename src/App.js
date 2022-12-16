import Header from "./components/common/Header";
import Snackbar from "./components/common/Snackbar";
import List from "./components/List/List";
import { useTodoOptions } from "./context/TodoContext";

function App() {
  const { snackColor, snackDisplay, snackMessage } = useTodoOptions();
  return (
    <div className="app">
      <div className="container py-8 px-4">
        <Header />
        <List />
        <Snackbar
          color={snackColor}
          display={snackDisplay}
          message={snackMessage}
        />
      </div>
    </div>
  );
}

export default App;
