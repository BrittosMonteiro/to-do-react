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
    <header className="header mb-8">
      <h1 className="text-white-1 font-lg font-regular">TOO-DO</h1>
      <span
        className="font-sm font-medium text-white-1 btn"
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer" }}
      >
        ADICIONAR TAREFA
      </span>
      <Modal open={open} onClose={closeModal} />
    </header>
  );
}
