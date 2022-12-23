import { ArrowCircleRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserAccount, loginUser } from "../services/loginService";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../store/action/toggleAction";
import { setUser } from "../store/action/loginAction";

export default function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSession = useSelector((state) => {
    return state.login;
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [border, setBorder] = useState(false);

  function handleCreate(e) {
    e.preventDefault();
    if (!name || !email || !username || !password || !confirmPass) {
      toggleMessageOptions("failed", true, "Preencha os campos corretamente");
      return;
    }

    if (password !== confirmPass) {
      toggleMessageOptions("failed", true, "Senhas não são iguais");
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
    createUserAccount(userData)
      .then((res) => res.json())
      .then((res) => {
        toggleMessageOptions("success", true, "Conta criada com sucesso");
        clearFields();
        if (res.username && res.password) {
          return login(res.username, res.password);
        } else {
          toggleMessageOptions("failed", true, "E-mail/usuário já cadastrado");
        }
      })
      .catch(() => {
        toggleMessageOptions("failed", true, "Não foi possível criar");
      });
  }

  function login(username, password) {
    loginUser({ username, password })
      .then((res) => res.json())
      .then((res) => {
        dispatch(
          setUser({
            id: res.id,
            token: res.token,
            username: res.username,
            isLogged: true,
          })
        );
        navigate("/toodo");
      })
      .catch(() => {
        toggleMessageOptions(
          "failed",
          true,
          "Ops... não conseguimos acessar. Tente novamente em alguns instantes :/"
        );
      });
  }

  function clearFields() {
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPass("");
  }

  function toggleMessageOptions(color, display, message) {
    dispatch(
      displayMessageBox({
        color,
        message,
        display,
      })
    );
    setTimeout(() => {
      dispatch(hideMessageBox());
    }, 5000);
  }

  useEffect(() => {
    if (userSession.isLogged) {
      navigate("/toodo");
    }
  }, [userSession, navigate]);

  return (
    <>
      {!userSession.isLogged && (
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
