import { useEffect, useState } from "react";
import Modal from "./Modal";

import { useTodoOptions } from "../../context/TodoContext";

export default function Header() {
  const [open, setOpen] = useState(false);

  const { displayModal } = useTodoOptions();

  useEffect(() => {
    closeModal();
  }, [displayModal]);

  function closeModal() {
    setOpen(false);
  }

  return (
    <header className="header">
      <h1 className="page-title">TOO-DO</h1>
      <span
        className="font-sm font-medium"
        onClick={() => setOpen(true)}
        style={{ color: "white", cursor: "pointer" }}
      >
        ADICIONAR TAREFA
      </span>
      <Modal open={open} onClose={closeModal} />
    </header>
  );
}
