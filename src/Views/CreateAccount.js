import { ArrowCircleRight } from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodoOptions } from "../context/TodoContext";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const { toggleSnackbar, createAccount } = useTodoOptions();

  function manageCreate(e) {
    e.preventDefault();
    if (!username || !password || !confirmPass) {
      toggleSnackbar("Preencha os campos corretamente", "failed");
      return;
    }

    if (password !== confirmPass) {
      toggleSnackbar("Senhas não são iguais", "failed");
    }

    const userData = {
      name,
      email,
      username,
      password,
    };

    createAccount(userData);
  }

  return (
    <>
      <form
        onSubmit={manageCreate}
        className="bg-dark-3 pa-4 ma-auto column"
        style={{ maxWidth: "450px" }}
      >
        <div className="row justify-content-center mb-4">
          <h1 className="font-lg font-light">Criar minha conta</h1>
        </div>
        <div className="column">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type={"text"}
            placeholder="Nome"
            className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="column">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type={"text"}
            placeholder="E-mail"
            className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="column">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type={"text"}
            placeholder="Usuário"
            className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="column">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type={"password"}
            placeholder="Senha"
            className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="column">
          <label htmlFor="confirmPass">Confirmar senha</label>
          <input
            id="confirmPass"
            type={"password"}
            placeholder="Senha"
            className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
            defaultValue={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </div>
        <div className="row justify-content-between align-items-center">
          <Link
            to="/login"
            className="text-white-1 row align-items-center font-md gap-2"
          >
            Accesar minha conta{" "}
            <ArrowCircleRight className="btn-icon icon-md" />
          </Link>
          <button
            type="submit"
            className="pa-2 border-radius-soft bg-green-1 text-white-1"
          >
            Criar
          </button>
        </div>
      </form>
    </>
  );
}
