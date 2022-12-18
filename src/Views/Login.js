import { ArrowCircleRight } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodoOptions } from "../context/TodoContext";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const { toggleSnackbar, login } = useTodoOptions();

  function manageLogin(e) {
    e.preventDefault();
    if (!user || !pass) {
      toggleSnackbar("Preencha os campos corretamente", "failed");
      return;
    }

    const userData = {
      user,
      pass,
    };

    login(userData);
  }

  return (
    <>
      <form
        onSubmit={manageLogin}
        className="bg-dark-3 pa-4 ma-auto column"
        style={{ maxWidth: "450px" }}
      >
        <div className="row justify-content-center mb-4">
          <h1 className="font-lg font-light">Acessar minha conta</h1>
        </div>
        <input
          type={"text"}
          placeholder="Usuário"
          className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type={"password"}
          placeholder="Senha"
          className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
          onChange={(e) => setPass(e.target.value)}
        />
        <div className="row justify-content-between align-items-center">
          <Link
            to="/create-account"
            className="text-white-1 row align-items-center font-md gap-2"
          >
            Criar minha conta <ArrowCircleRight className="btn-icon icon-md" />
          </Link>
          <button
            type="submit"
            className="pa-2 border-radius-soft bg-green-1 text-white-1"
          >
            Acessar
          </button>
        </div>
      </form>
    </>
  );
}
