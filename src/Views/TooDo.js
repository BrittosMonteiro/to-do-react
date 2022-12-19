import List from "../components/List/List";
import { useTodoOptions } from "../context/TodoContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function TooDo() {
  const { isLogged } = useTodoOptions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return <>{isLogged && <List />}</>;
}
