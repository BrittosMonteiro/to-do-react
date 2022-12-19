import { ArrowCircleRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTodoOptions } from "../context/TodoContext";

export default function CreateAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [border, setBorder] = useState(false);

  const { toggleSnackbar, createAccount, login, setUserInformation, isLogged } =
    useTodoOptions();
  const navigate = useNavigate();

  function handleCreate(e) {
    e.preventDefault();
    if (!name || !email || !username || !password || !confirmPass) {
      toggleSnackbar("Preencha os campos corretamente", "failed");
      return;
    }

    if (password !== confirmPass) {
      toggleSnackbar("Senhas não são iguais", "failed");
      setBorder(true);
      setTimeout(() => {
        setBorder(false);
      }, 5000);
      return;
    }

    const userData = {
      name,
      email,
      username,
      password,
    };
    manageCreate(userData);
  }

  function manageCreate(userData) {
    createAccount(userData)
      .then((res) => res.json())
      .then((res) => {
        toggleSnackbar("Conta criada com sucesso", "success");
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setConfirmPass("");
        if (res.username && res.password) {
          return login({ username: res.username, password: res.password })
            .then((res) => res.json())
            .then((res) => {
              setUserInformation(res);
              navigate("/toodo");
            })
            .catch(() => {
              toggleSnackbar(
                "Ops... não conseguimos acessar. Tente novamente em alguns instantes :/",
                "failed"
              );
            });
        } else {
          toggleSnackbar("E-mail/usuário já cadastrado", "failed");
        }
      })
      .catch(() => {
        toggleSnackbar("Não foi possível criar", "failed");
      });
  }

  useEffect(() => {
    if (isLogged) {
      navigate("/toodo");
    }
  }, [isLogged, navigate]);

  return (
    <>
      {!isLogged && (
        <form
          onSubmit={handleCreate}
          className="bg-dark-2 pa-4 ma-auto column"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type={"email"}
              placeholder="E-mail"
              className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="username">Usuário</label>
            <input
              id="username"
              type={"text"}
              placeholder="Usuário"
              className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type={"password"}
              placeholder="Senha"
              className={`border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4 ${
                border && "border-red"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="confirmPass">Confirmar senha</label>
            <input
              id="confirmPass"
              type={"password"}
              placeholder="Repita a senha"
              className={`border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4 ${
                border && "border-red"
              }`}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />
          </div>
          <div className="row justify-content-between align-items-center">
            <Link
              to="/"
              className="text-white-1 row align-items-center font-md gap-2"
            >
              Já tenho uma conta{" "}
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
      )}
    </>
  );
}
