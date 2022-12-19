import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTodoOptions } from "./context/TodoContext";
import Header from "./components/common/Header";
import Login from "./Views/Login";
import TooDo from "./Views/TooDo";
import CreateAccount from "./Views/CreateAccount";
import Snackbar from "./components/common/Snackbar";

function App() {
  const { snackColor, snackDisplay, snackMessage } = useTodoOptions();

  return (
    <div className="app py-4">
      <div className="container pa-4">
        <Header />
        <Router>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/create-account" exact element={<CreateAccount />} />
            <Route path="/toodo" exact element={<TooDo />} />
          </Routes>
        </Router>
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
