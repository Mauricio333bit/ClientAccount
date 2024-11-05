import React from "react";
import { useForm } from "react-hook-form";
// import { loginReq } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (valueUser) => {
    // const response = await loginReq(valueUser);
    // if (response.status === 201) {
    //   navigate("/admin");
    // }
    if (
      valueUser.email == "admin@gmail.com" &&
      valueUser.password == "admin1234" &&
      valueUser.cuit == "90309030"
    ) {
      navigate("/admin");
    }
    if (
      valueUser.email == "employed@gmail.com" &&
      valueUser.password == "employed1234" &&
      valueUser.cuit == "20102010"
    ) {
      navigate("/employed");
    }
    if (
      valueUser.email == "client@gmail.com" &&
      valueUser.password == "client1234" &&
      valueUser.cuit == "50605060"
    ) {
      navigate("/client");
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
