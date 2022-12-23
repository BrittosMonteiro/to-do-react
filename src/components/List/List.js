import { useEffect, useState } from "react";
import { readTaskList } from "../../services/taskServices";
import Item from "./Item";
import { useSelector } from "react-redux";

export default function List() {
  const userSession = useSelector((state) => {
    return state.login;
  });
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    readTaskList(userSession)
      .then((res) => res.json())
      .then((res) => {
        setTasksList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userSession]);

  return (
    <>
      {tasksList.length > 0 ? (
        <ol className="list gap-4">
          {tasksList.map((task, index) => (
            <Item key={index} task={task} />
          ))}
        </ol>
      ) : (
        <p className="no-data pa-4 border-radius-sm font-light font-sm text-center">
          NÃO HÁ TAREFAS
        </p>
      )}
    </>
  );
}
