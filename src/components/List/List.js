import { useEffect, useState } from "react";
import { useTodoOptions } from "../../context/TodoContext";
import Item from "./Item";

export default function List() {
  const [tasksList, setTasksList] = useState([]);

  const { todoList } = useTodoOptions();

  useEffect(() => {
    setTasksList(todoList);
  }, [todoList]);

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
