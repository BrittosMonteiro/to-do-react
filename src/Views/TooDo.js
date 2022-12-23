import List from "../components/List/List";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readTaskList } from "../services/taskServices";
import { setTaskList } from "../store/action/taskAction";

export default function TooDo() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!userSession.isLogged) {
      navigate("/");
    }
  }, [userSession, navigate]);

  useEffect(() => {
    readTaskList(userSession)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setTaskList(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userSession, dispatch]);

  return <>{userSession.isLogged && <List />}</>;
}
