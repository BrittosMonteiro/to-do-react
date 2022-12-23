import { ArrowCircleRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  displayMessageBox,
  hideMessageBox,
} from "../store/action/toggleAction";

import { setUser } from "../store/action/loginAction";
import { loginUser } from "../services/loginService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSession = useSelector((state) => {
    return state.login;
  });

  async function handleLogin(e) {
    e.preventDefault();
    if (!username || !pass) {
      toggleMessageOptions("failed", true, "Preencha os campos");
      return;
    }

    const userData = {
      username: username,
      password: pass,
    };
    await manageLogin(userData);
  }

  async function manageLogin(userData) {
    await loginUser(userData)
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          setUsername("");
          setPass("");
          dispatch(
            setUser({
              id: res.id,
              token: res.token,
              username: res.username,
              isLogged: true,
            })
          );
          navigate("/toodo");
        }
      })
      .catch(() => {
        toggleMessageOptions(
          "failed",
          true,
          "Ops... não conseguimos acessar. Tente novamente em alguns instantes :/"
        );
      });
  }

  useEffect(() => {
    if (userSession.isLogged) {
      navigate("/toodo");
    }
  }, [userSession, navigate]);

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

  return (
    <>
      {!userSession.isLogged && (
        <form
          onSubmit={handleLogin}
          className="bg-dark-2 pa-4 ma-auto column"
          style={{ maxWidth: "450px" }}
        >
          <div className="row justify-content-center mb-4">
            <h1 className="font-lg font-light">Acessar minha conta</h1>
          </div>
          <input
            type={"text"}
            placeholder="Usuário"
            className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            type={"password"}
            placeholder="Senha"
            className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
          <div className="row justify-content-between align-items-center">
            <Link
              to="/create-account"
              className="text-white-1 row align-items-center font-md gap-2"
            >
              Criar minha conta{" "}
              <ArrowCircleRight className="btn-icon icon-md" />
            </Link>
            <button
              type="submit"
              className="pa-2 border-radius-soft bg-green-1 text-white-1"
            >
              Acessar
            </button>
          </div>
        </form>
      )}
    </>
  );
}
