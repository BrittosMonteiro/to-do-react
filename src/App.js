import { useState } from "react";
import { Plus, Circle, CheckCircle, Trash } from "phosphor-react";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todoList")) || "[]"
  );

  function handleNewTask(e) {
    e.preventDefault();

    if (!e.target.newTask.value) return;

    const data = {
      task: e.target.newTask.value,
      status: false,
    };

    todos.unshift(data);
    handleTodo();
    e.target.newTask.value = null;
  }

  function changeItemStatus(key) {
    todos[key].status = !todos[key].status;
    handleTodo();
  }

  function deleteItemFromList(key) {
    todos.splice(key, 1);
    handleTodo();
  }

  function handleTodo() {
    localStorage.setItem("todoList", JSON.stringify(todos));
    setTodos(JSON.parse(localStorage.getItem("todoList")));
  }

  return (
    <div className="app">
      <div className="todos">
        <form className="form-todo" onSubmit={handleNewTask}>
          <label htmlFor="newTask">CRIAR TAREFA</label>
          <div className="newTaskArea">
            <input
              type={"text"}
              name="newTask"
              id="newTask"
              placeholder="NOVA TAREFA"
            />
            <button type="submit">
              <Plus weight="bold" />
            </button>
          </div>
        </form>
        <ol className="list-todo">
          {todos.map((item, key) => (
            <li className="todo-item" key={key}>
              <div>
                <button type="button" className="btn-icon">
                  {item.status === false ? (
                    <Circle
                      color="#fff"
                      size={18}
                      onClick={() => changeItemStatus(key)}
                    />
                  ) : (
                    <CheckCircle
                      color="#fff"
                      size={18}
                      onClick={() => changeItemStatus(key)}
                    />
                  )}
                </button>
                <span>{item.task}</span>
              </div>
              <button
                type="button"
                className="btn-icon"
                onClick={() => deleteItemFromList(key)}
              >
                <Trash color="#f00" />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default App;
