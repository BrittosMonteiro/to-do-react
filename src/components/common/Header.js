import * as Dialog from "@radix-ui/react-dialog";
import TaskDialog from "./Dialog";

export default function Header() {
  return (
    <header className="header">
      <h1 className="page-title">TOO-DO</h1>
      <Dialog.Root>
        <Dialog.Trigger className="btn btn-default">
          ADICIONAR TAREFA
        </Dialog.Trigger>
        <TaskDialog />
      </Dialog.Root>
    </header>
  );
}
