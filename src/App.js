import Header from "./components/common/Header";
import Login from "./Views/Login";
import TooDo from "./Views/TooDo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateAccount from "./Views/CreateAccount";

function App() {
  return (
    <div className="app">
      <div className="container py-8 px-4">
        <Header />
        <Router>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/create-account" exact element={<CreateAccount />} />
            <Route path="/toodo" exact element={<TooDo />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
