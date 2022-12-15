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

  function loadItemsList() {
    readTaskList()
      .then((res) => res.json())
      .then((res) => {
        setTodoList(res);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadItemsList();
  }, []);

  function addItemToTodoList(newTask) {
    createTask(newTask)
      .then((res) => res.json())
      .then((res) => {
        setTodoList([res, ...todoList]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        displayModalOnScreen(false);
      });
  }

  function manageUpdateTask(task) {
    updateTask(task)
      .then(() => {
        loadItemsList();
      })
      .catch((err) => {
        console.log(err);
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
      });
  }

  function removeItemFromTodoList(key) {
    deleteTask(key)
      .then(() => {
        loadItemsList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clearTodoList() {}

  function login(userData) {}

  function logout(userData) {}

  function displayModalOnScreen(state) {
    setDisplayModal(state);
  }

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
  };

  return (
    <TodoContext.Provider value={todoStates}>{children}</TodoContext.Provider>
  );
}
