import { useEffect, useState } from "react";
import Modal from "./Modal";

import { useTodoOptions } from "../../context/TodoContext";
import { PlusCircle, SignOut } from "phosphor-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const { displayModal, isLogged, logout } = useTodoOptions();

  useEffect(() => {
    closeModal();
  }, [displayModal]);

  function closeModal() {
    setOpen(false);
  }

  return (
    <header className="header mb-8">
      <h1 className="text-white-1 font-lg font-regular">TOO-DO</h1>
      {isLogged && (
        <div className="gap-2" style={{ display: "flex" }}>
          <button
            type="button"
            className="btn-default"
            onClick={() => setOpen(true)}
          >
            <PlusCircle className="btn-icon text-white-1 icon-md" />
          </button>
          <Modal open={open} onClose={closeModal} />
          <button
            type="button"
            className="btn-default"
            onClick={() => logout()}
          >
            <SignOut className="btn-icon text-white-1 icon-md" />
          </button>
        </div>
      )}
    </header>
  );
}
