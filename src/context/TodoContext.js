import { useState, useContext, createContext, useEffect } from "react";
import {
  createTask,
  deleteTask,
  readTaskList,
  updateTask,
  updateTaskStatus,
} from "../services/taskServices";
const TodoContext = createContext(null);

export function useTodoOptions() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const [displayModal, setDisplayModal] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackColor, setSnackColor] = useState("");
  const [snackDisplay, setSnackDisplay] = useState(false);

  function loadItemsList() {
    readTaskList()
      .then((res) => res.json())
      .then((res) => {
        setTodoList(res);
      })
      .catch((err) => console.log(err));
  }

  function addItemToTodoList(newTask) {
    createTask(newTask)
      .then((res) => res.json())
      .then((res) => {
        setTodoList([res, ...todoList]);
        toggleSnackbar("Task criada", "success", true);
      })
      .catch((err) => {
        console.log(err);
        toggleSnackbar("Erro ao criar task", "failed", true);
      })
      .finally(() => {
        displayModalOnScreen(false);
      });
  }

  function manageUpdateTask(task) {
    updateTask(task)
      .then(() => {
        loadItemsList();
        toggleSnackbar("Task alterada", "success", true);
      })
      .catch((err) => {
        console.log(err);
        toggleSnackbar("Erro ao alterar", "failed", true);
      })
      .finally(() => {
        displayModalOnScreen(false);
      });
  }

  function switchItemStatus(taskId, status) {
    if (status === 0 || status === 1) {
      updatetatus(taskId, 2);
    } else {
      if (status >= 3) {
        updatetatus(taskId, 1);
      } else {
        updatetatus(taskId, status + 1);
      }
    }
  }

  function updatetatus(taskId, status) {
    updateTaskStatus(taskId, status)
      .then(() => {
        loadItemsList();
      })
      .catch((err) => {
        console.log(err);
        toggleSnackbar("Erro ao atualizar", "failed", true);
      });
  }

  function removeItemFromTodoList(key) {
    deleteTask({id: key})
      .then(() => {
        loadItemsList();
        toggleSnackbar("Task excluída", "success", true);
      })
      .catch((err) => {
        console.log(err);
        toggleSnackbar("Problema ao excluir", "failed", true);
      });
  }

  function displayModalOnScreen(state) {
    setDisplayModal(state);
  }

  function toggleSnackbar(message, status) {
    setSnackMessage(message);
    setSnackColor(status);
    setSnackDisplay(true);

    setTimeout(() => {
      setSnackMessage("");
      setSnackColor("");
      setSnackDisplay(false);
    }, 5000);
  }

  function clearTodoList() {}

  function login(userData) {}

  function logout(userData) {}

  useEffect(() => {
    loadItemsList();
  }, []);

  const todoStates = {
    todoList,
    addItemToTodoList,
    manageUpdateTask,
    switchItemStatus,
    removeItemFromTodoList,
    clearTodoList,
    login,
    logout,
    displayModal,
    snackColor,
    snackMessage,
    snackDisplay,
  };

  return (
    <TodoContext.Provider value={todoStates}>{children}</TodoContext.Provider>
  );
}
