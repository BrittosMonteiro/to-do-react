import { useState } from "react";
import Modal from "./Modal";
import { PlusCircle, SignOut } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../store/action/loginAction";

export default function Header() {
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  return (
    <header className="header mb-8">
      <h1 className="text-white-1 font-lg font-regular">TOO-DO</h1>
      {userSession.isLogged && (
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
            onClick={() => dispatch(removeUser())}
          >
            <SignOut className="btn-icon text-white-1 icon-md" />
          </button>
        </div>
      )}
    </header>
  );
}
