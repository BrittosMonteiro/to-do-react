import { useState } from "react";
import { Circle, CheckCircle, Trash } from "phosphor-react";

import { useTodoOptions } from "../../context/TodoContext";
import Modal from "../common/Modal";

export default function Item({ task }) {
  const [open, setOpen] = useState(false);
  const { removeItemFromTodoList, switchItemStatus } = useTodoOptions();

  function deleteItemFromList() {
    removeItemFromTodoList();
  }

  function changeItemStatus() {
    switchItemStatus();
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <li className="list-item pa-4 justify-content-between border-radius-soft">
      <div className="gap-2">
        <button type="button" className="btn-icon">
          {task.statusId === 1 ? (
            <Circle
              className="icon-default icon-white-1"
              onClick={() => changeItemStatus()}
            />
          ) : (
            <CheckCircle
              className="icon-default icon-white-1"
              onClick={() => changeItemStatus()}
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
        {/* <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="font-sm font-medium">
            {task.taskTitle}
          </Dialog.Trigger>
          <TaskDialog taskDetail={task} />
        </Dialog.Root> */}
      </div>

      <button
        type="button"
        className="btn-icon"
        onClick={() => deleteItemFromList()}
      >
        <Trash className="icon-default icon-red-1" />
      </button>
    </li>
  );
}
