import { useState, useEffect } from "react";
import {
  Square,
  ListPlus,
  PencilSimple,
  Check,
  X,
  Trash,
  CheckSquare,
} from "phosphor-react";
import { useTodoOptions } from "../../context/TodoContext";

export default function Modal({ taskDetail, id, open, onClose }) {
  const [taskId, setTaskId] = useState(null);
  const [taskStatus, setTaskStatus] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskEndDate, setTaskEndDate] = useState("");
  const [taskTotalTime, setTaskTotalTime] = useState("");
  const [taskItems, setTaskItems] = useState([]);
  const [taskCheckList, setTaskCheckList] = useState([]);
  const [taskNotes, setTaskNotes] = useState("");

  const [newItemInItemList, setNewItemInItemList] = useState("");
  const [newItemInCheckList, setNewItemInCheckList] = useState("");

  const { addItemToTodoList, manageUpdateTask } = useTodoOptions();

  useEffect(() => {
    if (taskDetail) {
      setTaskId(taskDetail.id);
      setTaskTitle(taskDetail.title);
      setTaskStatus(taskDetail.status);
      setTaskStartDate(taskDetail.startDate);
      setTaskEndDate(taskDetail.endDate);
      setTaskTotalTime(taskDetail.totalTime);
      setTaskItems(taskDetail.items);
      setTaskCheckList(taskDetail.checkList);
      setTaskNotes(taskDetail.notes);
    }
  }, [taskDetail]);

  const status = [
    {
      id: 1,
      title: "Em andamento",
    },
    {
      id: 2,
      title: "Concluído",
    },
    {
      id: 3,
      title: "Cancelado",
    },
  ];

  function manageTask(e) {
    e.preventDefault();
    let data = {
      status: parseInt(taskStatus),
      title: taskTitle,
      startDate: taskStartDate,
      endDate: taskEndDate,
      totalTime: taskTotalTime,
      items: taskItems,
      checkList: taskCheckList,
      notes: taskNotes,
    };

    if (taskDetail) {
      data = { ...data, id: taskId };
      manageUpdateTask(data);
    } else {
      addItemToTodoList(data);
    }
    onClose();
    clearFormField();
  }

  function addItemToItemList() {
    if (!newItemInItemList) return;
    const newItem = {
      title: newItemInItemList,
    };
    setTaskItems([...taskItems, newItem]);
  }

  function addItemToCheckList() {
    if (!newItemInCheckList) return;
    const newItem = {
      title: newItemInCheckList,
      status: false,
    };
    setTaskCheckList([...taskCheckList, newItem]);
  }

  function changeItemStatusOnCheckList(id) {
    const updateStatus = taskCheckList[id];
    updateStatus.status = !updateStatus.status;

    const newList = taskCheckList;
    newList[id] = updateStatus;

    setNewItemInCheckList([...newList]);
  }

  function removeItemFromItemList(id) {
    let newList = taskItems;
    newList.splice(id, 1);
    setTaskItems([...newList]);
  }

  function removeItemFromCheckList(id) {
    let newList = taskCheckList;
    newList.splice(id, 1);
    setTaskCheckList([...newList]);
  }

  useEffect(() => {
    setTaskItems(taskItems);
    setNewItemInItemList("");
  }, [taskItems]);

  useEffect(() => {
    setTaskCheckList(taskCheckList);
    setNewItemInCheckList("");
  }, [taskCheckList]);

  function closeModal(e) {
    const elementId = e.target.id === "overlay";
    if (elementId) onClose();
  }

  function clearFormField() {
    setTaskId(null);
    setTaskTitle("");
    setTaskStatus(0);
    setTaskStartDate("");
    setTaskEndDate("");
    setTaskTotalTime("");
    setTaskItems("");
    setTaskCheckList("");
    setTaskNotes("");
  }

  return (
    <>
      {open && (
        <div className="overlay" id="overlay" onClick={(e) => closeModal(e)}>
          <div className="dialog">
            <form onSubmit={manageTask}>
              <div>
                <select
                  name="task_status"
                  id="task_status"
                  className="border-radius-soft"
                  value={taskStatus}
                  onChange={(status) => setTaskStatus(status.target.value)}
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
                  defaultValue={taskTitle}
                  onChange={(title) => setTaskTitle(title.target.value)}
                />
                {/* <button type="button" className="btn">
                  <PencilSimple className="icon-default icon-white-1" />
                </button> */}
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
                    value={taskStartDate}
                    onChange={(startDate) =>
                      setTaskStartDate(startDate.target.value)
                    }
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
                    value={taskEndDate}
                    onChange={(endDate) => setTaskEndDate(endDate.target.value)}
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
                    value={taskTotalTime}
                    onChange={(totalTime) =>
                      setTaskTotalTime(totalTime.target.value)
                    }
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
                    defaultValue={newItemInItemList}
                    onChange={(e) => setNewItemInItemList(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => addItemToItemList()}
                  >
                    <ListPlus className="icon-default icon-white-1" />
                  </button>
                </div>
                {taskItems.length > 0 ? (
                  <ol className="list">
                    {taskItems.map((item, index) => (
                      <li key={index}>
                        <span>{item.title}</span>
                        <button type="button" className="btn-icon">
                          <Trash
                            className="icon-default icon-red-1"
                            onClick={() => removeItemFromItemList(index)}
                          />
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
                    defaultValue={newItemInCheckList}
                    onChange={(e) => setNewItemInCheckList(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn-icon"
                    onClick={() => addItemToCheckList()}
                  >
                    <ListPlus className="icon-default icon-white-1" />
                  </button>
                </div>
                {taskCheckList.length > 0 ? (
                  <ol className="list">
                    {taskCheckList.map((item, index) => (
                      <li key={index}>
                        <button type="button" className="btn-icon">
                          {!item.status ? (
                            <Square
                              className="icon-default icon-white-1"
                              onClick={() => changeItemStatusOnCheckList(index)}
                            />
                          ) : (
                            <CheckSquare
                              className="icon-default icon-white-1"
                              onClick={() => changeItemStatusOnCheckList(index)}
                            />
                          )}
                        </button>
                        <span>{item.title}</span>
                        <button type="button" className="btn-icon">
                          <Trash
                            className="icon-default icon-red-1"
                            onClick={() => removeItemFromCheckList(index)}
                          />
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
                value={taskNotes}
                onChange={(notes) => setTaskNotes(notes.target.value)}
              />

              <div className="row justify-content-between mt-4">
                <button
                  type={"button"}
                  onClick={() => onClose()}
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
                </button>
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
                  {taskDetail?.id ? "Atualizar" : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
