import React from "react";
import { useForm } from "react-hook-form";
// import { loginReq } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import useAccountStore from "../store/accountStore";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const login = useAccountStore((state) => state.login);

  const onSubmit = async (valueUser) => {
    const accountLogged = login(
      valueUser.email,
      valueUser.password,
      valueUser.cuit
    );

    if (accountLogged && accountLogged.rol) {
      navigate(`/${accountLogged.rol}`);
    } else {
      console.error("Login failed");
    }
  };
  return (
    <form
      className="sign-in-form"
      onSubmit={handleSubmit((values) => {
        onSubmit(values);
      })}
    >
      <h2 className="title">Inicio de sesion</h2>

      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true })}
        />
      </div>

      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: true })}
        />
      </div>

      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Cuit"
          {...register("cuit", { required: true })}
        />
      </div>

      <input type="submit" value="Iniciar" className="btn solid" />
      <p className="social-text"></p>
    </form>
  );
};
