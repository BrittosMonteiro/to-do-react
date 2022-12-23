export default function modalReducer(state = false, action) {
  switch (action.type) {
    case "CLOSE_MODAL":
      return (state = false);
    default:
      break;
  }
}
