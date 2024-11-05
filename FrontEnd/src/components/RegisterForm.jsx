import React from "react";
import { useForm } from "react-hook-form";
import { registerReq } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (valueUser) => {
    const response = await registerReq(valueUser);
    console.log(response);
    if (response.status === 201) {
      navigate("/account/home");
    }
  };

  return (
    <form
      onSubmit={handleSubmit((values) => {
        console.log(values);
        onSubmit(values);
      })}
      className="sign-up-form"
    >
      <h2 className="title">Registro</h2>

      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Nombre de usuario"
          {...register("fullName", { required: true })}
        />
      </div>

      <div className="input-field">
        <i className="fas fa-envelope"></i>
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
        <i className="fas fa-user-shield"></i>
        <input
          type="text"
          placeholder="CUIT"
          {...register("cuit", { required: true })}
        />
      </div>

      <input type="submit" value="Crear cuenta" className="btn solid" />

      <p className="social-text"></p>
    </form>
  );
};

export default RegisterForm;
