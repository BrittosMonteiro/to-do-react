import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Circle, CheckCircle, Trash } from "phosphor-react";

import { deleteTask, getTasks } from "../../service/task-service";
import TaskDialog from "../common/Dialog";

export default function List() {
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);

  function getTasksList() {
    getTasks()
      .then((res) => res.json())
      .then((res) => {
        setTasks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTasksList();
  }, []);

  function changeItemStatus(id) {
    console.log(id);
  }

  function deleteItemFromList(key) {
    deleteTask(key)
      .then(() => {
        getTasksList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {tasks.length > 0 ? (
        <ol className="list gap-4">
          {tasks.map((task) => (
            <li
              className="list-item pa-4 justify-content-between border-radius-soft"
              key={task.id}
            >
              <div className="gap-2">
                <button type="button" className="btn-icon">
                  <Circle
                    className="icon-default icon-white-1"
                    onClick={() => changeItemStatus(task.id)}
                  />
                  <CheckCircle
                    className="icon-default icon-white-1"
                    onClick={() => changeItemStatus(task.id)}
                  />
                </button>
                <Dialog.Root>
                  <Dialog.Trigger
                    className="font-sm font-medium"
                    onClick={() => setTaskId(task.id)}
                  >
                    {task.title}
                  </Dialog.Trigger>
                  <TaskDialog id={taskId} />
                </Dialog.Root>
              </div>

              <button
                type="button"
                className="btn-icon"
                onClick={() => deleteItemFromList(task.id)}
              >
                <Trash className="icon-default icon-red-1" />
              </button>
            </li>
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
