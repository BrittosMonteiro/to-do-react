export default function taskReducer(status = [], action) {
  switch (action.type) {
    case "SET_TASK_LIST":
      return (status = action.payload);
    default:
      return status;
  }
}
