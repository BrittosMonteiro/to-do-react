import { useState } from "react";
import { Circle, CheckCircle, Trash, XCircle } from "phosphor-react";

import { useTodoOptions } from "../../context/TodoContext";
import Modal from "../common/Modal";

export default function Item({ task }) {
  const [open, setOpen] = useState(false);
  const { removeItemFromTodoList, switchItemStatus } = useTodoOptions();

  function deleteItemFromList(id) {
    removeItemFromTodoList(id);
  }

  function changeItemStatus(taskId, status) {
    switchItemStatus(taskId, status);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <li className="list-item pa-4 justify-content-between border-radius-soft">
      <div className="row gap-2">
        <button type="button" className="btn-icon">
          {(!task.status || task.status === 0 || task.status === 1) && (
            <Circle
              className="icon-default icon-white-1"
              onClick={() => changeItemStatus(task.id, task.status)}
            />
          )}
          {task.status === 2 && (
            <CheckCircle
              className="icon-default icon-white-1"
              onClick={() => changeItemStatus(task.id, task.status)}
            />
          )}
          {task.status === 3 && (
            <XCircle
              className="icon-default icon-white-1"
              onClick={() => changeItemStatus(task.id, task.status)}
            />
          )}
        </button>
        <span
          className="font-sm font-medium"
          onClick={() => setOpen(true)}
          style={{ color: "white", cursor: "pointer" }}
        >
          {task.title}
        </span>
        <Modal taskDetail={task} open={open} onClose={closeModal} />
      </div>

      <button
        type="button"
        className="btn-icon"
        onClick={() => deleteItemFromList(task.id)}
      >
        <Trash className="icon-default icon-red-1" />
      </button>
    </li>
  );
}
