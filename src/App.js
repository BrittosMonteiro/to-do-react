import { useEffect, useState } from "react";
import { Plus, Circle, CheckCircle, Trash } from "phosphor-react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todoList")) || []);
  }, []);

  const [newTask, setNewTask] = useState(null);

  function handleNewTask(e) {
    e.preventDefault();

    if (!newTask) return;

    const data = {
      task: newTask,
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
    setNewTask(null);
  }

  return (
    <div className="app">
      <div className="todos">
        <h1 className="page-title">TAREFAS</h1>
        <form className="form-todo" onSubmit={handleNewTask}>
          <label htmlFor="newTask">CRIAR TAREFA</label>
          <div className="newTaskArea">
            <input
              type={"text"}
              name="newTask"
              id="newTask"
              defaultValue={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="TÍTULO"
            />
            <button type="submit" disabled={!newTask}>
              <Plus weight="bold" />
            </button>
          </div>
        </form>
        {todos.length > 0 ? (
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
        ) : (
          <p className="no-data">NÃO HÁ TAREFAS</p>
        )}
      </div>
    </div>
  );
}

export default App;
