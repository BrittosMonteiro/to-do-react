import { useState } from "react";
import { Circle, CheckCircle, Trash, XCircle } from "phosphor-react";

import Modal from "../common/Modal";
import { deleteTask, updateTaskStatus } from "../../services/taskServices";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../../store/action/toggleAction";
import { removeTaskFromList } from "../../store/action/taskAction";

export default function Item({ task }) {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [open, setOpen] = useState(false);

  function deleteItemFromList(id) {
    deleteTask({ id }, userSession)
      .then(() => {
        dispatch(removeTaskFromList(id));
        toggleMessageOptions("success", true, "Task excluída");
      })
      .catch((err) => {
        console.log(err);
        toggleMessageOptions("failed", true, "Problema ao excluir");
      });
  }

  function changeItemStatus(taskId, status) {
    if (status === 0 || status === 1) {
      manageTaskStatus(taskId, 2);
    } else {
      if (status >= 3) {
        manageTaskStatus(taskId, 1);
      } else {
        manageTaskStatus(taskId, status + 1);
      }
    }
  }

  function manageTaskStatus(taskId, status) {
    updateTaskStatus(taskId, status, userSession)
      .then(() => {
        // loadItemsList();
        toggleMessageOptions("success", true, "Status atualizado");
      })
      .catch(() => {
        toggleMessageOptions("failed", true, "Erro ao atualizar");
      });
  }

  function closeModal() {
    setOpen(false);
  }

  function toggleMessageOptions(color, display, message) {
    dispatch(
      displayMessageBox({
        color,
        message,
        display,
      })
    );
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
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
