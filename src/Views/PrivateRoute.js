import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute() {
  const userSession = useSelector((state) => {
    return state.login;
  });

  return userSession.isLogged ? <Outlet /> : <Navigate to={"/"} />;
}
