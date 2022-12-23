import Item from "./Item";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function List() {
  const taskList = useSelector((state) => {
    return state.task;
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(taskList);
  }, [setTasks, taskList]);

  return (
    <>
      {tasks.length > 0 ? (
        <ol className="list gap-4">
          {tasks.map((task, index) => (
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
