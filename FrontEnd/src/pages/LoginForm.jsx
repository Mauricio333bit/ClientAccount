import React, { useState } from "react";
import Lottie from "lottie-react";
import signIn from "../assets/signIn.json";
import signUp from "../assets/sign-up.json";

export const LoginForm = () => {
  // Estado para controlar el modo de inicio de sesión/registro
  const [signInMode, setSignInMode] = useState(false);

  // Función para cambiar al modo de inicio de sesión
  const handleSignInMode = () => {
    setSignInMode(!signInMode);
  };
  return (
    <>
      <div className={`containerLog ${signInMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="" className="sign-in-form">
              <h2 className="title">Inicio de sesion</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Nombre de usuario" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Contraseña" />
              </div>
              <input type="submit" value="Iniciar" className="btn solid" />
              <p className="social-text"></p>
            </form>

            <form action="" className="sign-up-form">
              <h2 className="title">Registro</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Nombre de usuario" />
              </div>
              <div className="input-field">
                <i className="fas fa-user-shield"></i>
                <input type="text" placeholder="CUIT" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Contraseña" />
              </div>
              <input type="submit" value="Crear cuenta" className="btn solid" />
              <p className="social-text"></p>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>Eres nuevo?</h3>
              <p>Registrate para poder acceder a la plataforma</p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleSignInMode}
              >
                Registrarse
              </button>
            </div>
            <Lottie animationData={signUp} className="p-0 mx-auto image" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Ya tienes cuenta?</h3>
              <p>Ingresa con tus credenciales</p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleSignInMode}
              >
                Ingresar
              </button>
            </div>
            <Lottie animationData={signIn} className=" image" />
          </div>
        </div>
      </div>
    </>
  );
};
