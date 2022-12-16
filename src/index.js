import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TodoProvider } from "./context/TodoContext";
import "./styles/main.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>
);
