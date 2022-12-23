import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Login from "./Views/Login";
import TooDo from "./Views/TooDo";
import CreateAccount from "./Views/CreateAccount";
import Snackbar from "./components/common/Snackbar";
import { useDispatch } from "react-redux";
import { setUser } from "./store/action/loginAction";

function App() {
  const dispatch = useDispatch();

  const userSession = JSON.parse(localStorage.getItem("userSession"));
  if (userSession) {
    dispatch(setUser(userSession));
  }

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
        <Snackbar />
      </div>
    </div>
  );
}

export default App;
