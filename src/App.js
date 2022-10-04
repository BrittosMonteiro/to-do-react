import { useEffect, useState } from "react";
import {
  Plus,
  Circle,
  CheckCircle,
  Trash,
  Square,
  CheckSquare,
} from "phosphor-react";
import * as Accordion from "@radix-ui/react-accordion";
// import { styled } from "@stitches/react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todoList")) || []);
  }, []);

  const [newTask, setNewTask] = useState(null);
  const [subtask, setNewSubtask] = useState(null);

  function handleNewTask(e) {
    e.preventDefault();

    if (!newTask) return;

    const data = {
      task: newTask,
      status: false,
      subtask: [],
    };

    todos.unshift(data);
    handleTodo();
    e.target.newTask.value = null;
  }

  function handleNewSubtask(e, key) {
    e.preventDefault();

    const data = {
      title: subtask,
      status: false,
    };

    todos[key].subtask.unshift(data);
    handleTodo();
    e.target.subtask.value = null;
  }

  function changeItemStatus(key) {
    todos[key].status = !todos[key].status;
    handleTodo();
  }

  function changeSubtaskStatus(keyParant, keyChild) {
    console.log(keyParant);
    console.log(keyChild);

    todos[keyParant].subtask[keyChild].status =
      !todos[keyParant].subtask[keyChild].status;
    handleTodo();
  }

  function deleteItemFromList(key) {
    todos.splice(key, 1);
    handleTodo();
  }

  function deleteSubtaskFromList(keyParant, keyChild) {
    todos[keyParant].subtask.splice(keyChild, 1);
    handleTodo();
  }

  function handleTodo() {
    localStorage.setItem("todoList", JSON.stringify(todos));
    setTodos(JSON.parse(localStorage.getItem("todoList")));
    setNewTask(null);
    setNewSubtask(null);
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
          <Accordion.Root collapsible type="single">
            {todos.map((item, key) => (
              <Accordion.Item
                value={key + 1}
                key={key}
                className="accordion-item"
              >
                <Accordion.Header className="accordion-header">
                  <div>
                    <button type="button" className="btn-icon">
                      {item.status === false ? (
                        <Circle
                          size={18}
                          color="#fff"
                          onClick={() => changeItemStatus(key)}
                        />
                      ) : (
                        <CheckCircle
                          size={18}
                          color="#fff"
                          onClick={() => changeItemStatus(key)}
                        />
                      )}
                    </button>
                    <Accordion.Trigger className="accordion-trigger">
                      <span>{item.task}</span>
                    </Accordion.Trigger>
                  </div>
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => deleteItemFromList(key)}
                  >
                    <Trash size={18} color="#f00" />
                  </button>
                </Accordion.Header>
                <Accordion.Content className="accordion-content">
                  <form
                    onSubmit={(e) => handleNewSubtask(e, key)}
                    className="form-task"
                  >
                    <input
                      type="text"
                      placeholder="NOVO ITEM"
                      id="subtask"
                      name="subtask"
                      defaultValue={subtask}
                      onChange={(e) => setNewSubtask(e.target.value)}
                    />
                    <button type="submit">ADICIONAR</button>
                  </form>

                  {item.subtask.length > 0 ? (
                    <ol>
                      {item.subtask.map((subtask, subkey) => (
                        <li className="todo-item" key={subkey}>
                          <div>
                            <button type="button" className="btn-icon">
                              {subtask.status === false ? (
                                <Square
                                  className="btn-icon"
                                  size={18}
                                  color="#fff"
                                  onClick={() =>
                                    changeSubtaskStatus(key, subkey)
                                  }
                                />
                              ) : (
                                <CheckSquare
                                  className="btn-icon"
                                  size={18}
                                  color="#fff"
                                  onClick={() =>
                                    changeSubtaskStatus(key, subkey)
                                  }
                                />
                              )}
                            </button>
                            {subtask.title}
                          </div>
                          <Trash
                            className="btn-icon"
                            size={18}
                            color="#f00"
                            onClick={() => deleteSubtaskFromList(key, subkey)}
                          />
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="no-data">NÃO HÁ ITENS NESSA TAREFA</p>
                  )}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        ) : (
          <p className="no-data">NÃO HÁ TAREFAS</p>
        )}
      </div>
    </div>
  );
}

export default App;
