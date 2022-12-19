import { ArrowCircleRight } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTodoOptions } from "../context/TodoContext";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const { toggleSnackbar, login, setUserInformation, isLogged } =
    useTodoOptions();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!user || !pass) {
      toggleSnackbar("Preencha os campos corretamente", "failed");
      return;
    }

    const userData = {
      username: user,
      password: pass,
    };
    await manageLogin(userData);
  }

  async function manageLogin(userData) {
    await login(userData)
      .then((res) => res.json())
      .then((res) => {
        if (res.id) {
          setUser("");
          setPass("");
          setUserInformation(res);
          navigate("/toodo");
        } else {
          toggleSnackbar("Usuário/senha inválidos", "failed");
        }
      })
      .catch(() => {
        toggleSnackbar(
          "Ops... não conseguimos acessar. Tente novamente em alguns instantes :/",
          "failed"
        );
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
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
          <input
            type={"password"}
            placeholder="Senha"
            className="border-radius-soft pa-2 font-md font-medium bg-dark-1 text-white-1 mb-4"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            required
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
