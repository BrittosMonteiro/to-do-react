import * as Dialog from "@radix-ui/react-dialog";
import {
  Square,
  ListPlus,
  PencilSimple,
  Check,
  X,
  Trash,
} from "phosphor-react";
import {
  createTask,
  getTaskById,
  updateTask,
} from "../../service/task-service";
import { getStatus } from "../../service/status-service";
import { useEffect, useState } from "react";

export default function TaskDialog(props) {
  const taskDefault = {
    title: "",
    date_start: "",
    date_end: "",
    time_total: "",
    items: [],
    checklist: [],
    notes: "",
  };

  const [taskId, setTaskId] = useState(null);

  const [status, setStatus] = useState([]);
  const [task, setTask] = useState(taskDefault);

  const [items, setItems] = useState(taskDefault.items);
  const [newItem, setNewItem] = useState("");

  const [checklist, setChecklist] = useState(taskDefault.checklist);
  const [newChecklistItem, setNewChecklistItem] = useState("");

  function getStatusList() {
    getStatus()
      .then((res) => res.json())
      .then((res) => {
        setStatus(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getById(id) {
    getTaskById(id)
      .then((res) => res.json())
      .then((res) => {
        setTask(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleTask(e) {
    e.preventDefault();
    const data = {
      statusId: e.target.task_status.value,
      title: e.target.task_title.value,
      date_start: e.target.task_date_start.value,
      date_end: e.target.task_date_end.value,
      time_total: e.target.task_time_total.value,
      items: items,
      checklist: checklist,
      notes: e.target.task_notes.value,
    };

    if (task.id) {
      updateTask(data);
    } else {
      createTask(data)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getStatusList();
  }, []);

  useEffect(() => {
    setTaskId(props.id);
    if (taskId) {
      getById(taskId);
    }
  }, [taskId, props.id]);

  function addItemToItemsList(data) {
    if (!data) return;
    items.unshift(data);
  }

  function addItemToChecklist(data) {
    if (!data) return;
    checklist.unshift(data);
  }

  useEffect(() => {
    setItems(items);
  }, [items]);

  useEffect(() => {
    if (!task.items.length > 0) return;

    let list = task.items.split(",");
    setItems(list);
  }, [task]);

  useEffect(() => {
    setChecklist(checklist);
  }, [checklist]);

  useEffect(() => {
    if (!task.checklist.length > 0) return;

    let list = task.checklist.split(",");
    setChecklist(list);
  }, [task]);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="overlay">
        <Dialog.Content className="dialog">
          <form onSubmit={handleTask}>
            <div>
              <select
                name="task_status"
                id="task_status"
                className="border-radius-soft"
                defaultValue={task.status}
              >
                <option value="">Status</option>
                {status.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="row gap-2 mt-4">
              <input
                type={"text"}
                name="task_title"
                id="task_title"
                placeholder="Título"
                className="input py-2 mt-2 font-md border-radius-soft"
                defaultValue={task.title}
              />
              <button type="button" className="btn">
                <PencilSimple className="icon-default icon-white-1" />
              </button>
            </div>

            <hr />

            <div className="row mt-4 gap-2 align-items-start">
              <div className="column">
                <label htmlFor="task_date_start">Data de início</label>
                <input
                  type={"date"}
                  name="task_date_start"
                  id="task_date_start"
                  placeholder="Data de início"
                  className="input pa-2 font-sm text-center border-radius-soft border-default"
                  defaultValue={task.date_start}
                />
              </div>

              <div className="column">
                <label htmlFor="task_date_end">Data de fim</label>
                <input
                  type={"date"}
                  name="task_date_end"
                  id="task_date_end"
                  placeholder="Data de fim"
                  className="input pa-2 font-sm text-center border-radius-soft border-default"
                  defaultValue={task.date_end}
                />
              </div>

              <div className="column">
                <label htmlFor="task_time_total">Tempo (horas)</label>
                <input
                  type={"number"}
                  name="task_time_total"
                  id="task_time_total"
                  placeholder="Tempo em horas"
                  min={0}
                  max={8}
                  className="input pa-2 font-sm text-center border-radius-soft border-default"
                  defaultValue={task.time_total}
                />
              </div>
            </div>

            <hr />

            <div className="column mt-4">
              <label htmlFor="task_items">Itens</label>
              <div className="row gap-2 align-items-center">
                <input
                  type={"text"}
                  name="task_new_list_item"
                  id="task_new_list_item"
                  placeholder="Adicionar novo item"
                  className="input pa-2 font-sm mt-2 border-radius-soft border-default"
                  onChange={(e) => setNewItem(e.target.value)}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => addItemToItemsList(newItem)}
                >
                  <ListPlus className="icon-default icon-white-1" />
                </button>
              </div>
              {items.length > 0 ? (
                <ol className="list">
                  {items.map((item, key) => (
                    <li key={key}>
                      <span>{item}</span>
                      <button type="button" className="btn">
                        <Trash className="icon-default icon-red-1" />
                      </button>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>

            <hr />

            <div className="column mt-4">
              <label htmlFor="task_new_checklist_item">Check-list</label>
              <div className="row gap-2 align-items-center">
                <input
                  type={"text"}
                  name="task_new_checklist_item"
                  id="task_new_checklist_item"
                  placeholder="Adicionar novo item"
                  className="input pa-2 font-sm mt-2 border-radius-soft border-default"
                  onChange={(e) => setNewChecklistItem(e.target.value)}
                />
                <button
                  type="button"
                  className="btn"
                  onClick={() => addItemToChecklist(newChecklistItem)}
                >
                  <ListPlus className="icon-default icon-white-1" />
                </button>
              </div>
              {checklist.length > 0 ? (
                <ol className="list">
                  {checklist.map((item, key) => (
                    <li key={key}>
                      <button type="button" className="btn">
                        <Square className="icon-default icon-white-1" />
                      </button>
                      <span>{item}</span>
                      <button type="button" className="btn">
                        <Trash className="icon-default icon-red-1" />
                      </button>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>

            <hr />

            <textarea
              name="task_notes"
              id="task_notes"
              placeholder="Anotações"
              className="note font-sm mt-4 pa-2 border-radius-soft border-default"
              defaultValue={task.notes}
            />

            <div className="row justify-content-between mt-4">
              <Dialog.Close
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#C73E3E",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#fff",
                  padding: "4px",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                <X className="icon-default icon-white-1" />
                Fechar
              </Dialog.Close>
              <button
                type="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#477E3E",
                  fontWeight: "400",
                  fontSize: "14px",
                  lineHeight: "17px",
                  color: "#fff",
                  padding: "4px",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                <Check className="icon-default icon-white-1" />
                Salvar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}
