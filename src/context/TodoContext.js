import * as React from "react";
const TodoContext = React.createContext(null);

export function useTodoOptions() {
  return React.useContext(TodoContext);
}

export function TodoProvider({ children }) {
  let todo = JSON.parse(localStorage.getItem("todoList") || "[]");
  const [displayModal, setDisplayModal] = React.useState(false);

  const [todoList, setTodoList] = React.useState(todo);

  function addItemToTodoList(newTask) {
    todo.unshift(newTask);
    localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);
    displayModalOnScreen(false);
  }

  function switchItemStatus(key) {
    if (todo[key].statusId === 1) {
      todo[key].statusId = 2;
    } else {
      todo[key].statusId = 1;
    }

    localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);
  }

  function removeItemFromTodoList(key) {
    todo.splice(key, 1);
    localStorage.setItem("todoList", JSON.stringify(todo));
    setTodoList(todo);
  }

  function clearTodoList() {
    todo.length = 0;
    localStorage.removeItem("todoList");
    setTodoList(todo);
  }

  function login(userData) {
    console.log(userData);
  }

  function logout(userData) {
    console.log(userData);
  }

  function displayModalOnScreen(state) {
    setDisplayModal(state);
  }

  const todoStates = {
    todoList,
    addItemToTodoList,
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
