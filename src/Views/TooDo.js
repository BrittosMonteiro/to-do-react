import List from "../components/List/List";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function TooDo() {
  const login = useSelector((state) => {
    return state.login;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!login.isLogged) {
      navigate("/");
    }
  }, [login, navigate]);

  return <>{login.isLogged && <List />}</>;
}
