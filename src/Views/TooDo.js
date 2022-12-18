import Snackbar from "../components/common/Snackbar";
import List from "../components/List/List";
import { useTodoOptions } from "../context/TodoContext";

export default function TooDo() {
  const { snackColor, snackDisplay, snackMessage } = useTodoOptions();

  return (
    <>
      <List />
      <Snackbar
        color={snackColor}
        display={snackDisplay}
        message={snackMessage}
      />
    </>
  );
}
