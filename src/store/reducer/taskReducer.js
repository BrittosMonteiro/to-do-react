export default function taskReducer(state = [], action) {
  switch (action.type) {
    case "SET_TASK_LIST":
      return (state = action.payload);
    case "ADD_TASK_TO_LIST":
      return (state = [action.payload, ...state]);
    case "UPDATE_TASK_ON_LIST":
      return;
    case "REMOVE_TASK_FROM_LIST":
      return (state = state.filter((e) => e.id !== action.payload));
    default:
      return state;
  }
}
