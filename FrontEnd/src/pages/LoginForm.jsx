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
        <div class="forms-container">
          <div class="signin-signup">
            <form action="" class="sign-in-form">
              <h2 class="title">Inicio de sesion</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Nombre de usuario" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Contraseña" />
              </div>
              <input type="submit" value="Iniciar" class="btn solid" />
              <p class="social-text"></p>
            </form>

            <form action="" class="sign-up-form">
              <h2 class="title">Registro</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Nombre de usuario" />
              </div>
              <div class="input-field">
                <i class="fas fa-user-shield"></i>
                <input type="text" placeholder="CUIT" />
              </div>
              <div class="input-field">
                <i class="fas fa-envelope"></i>
                <input type="text" placeholder="Email" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Contraseña" />
              </div>
              <input type="submit" value="Crear cuenta" class="btn solid" />
              <p class="social-text"></p>
            </form>
          </div>
        </div>
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h3>Eres nuevo?</h3>
              <p>Registrate para poder acceder a la plataforma</p>
              <button
                class="btn transparent"
                id="sign-up-btn"
                onClick={handleSignInMode}
              >
                Registrarse
              </button>
            </div>
            <Lottie
              animationData={signUp}
              className="p-0 mx-auto image"
              style={{ width: "100%", height: "100%" }}
              wrapperClassName="lottie-container"
              preserveAspectRatio="xMidYMid meet"
              direction="alternate"
              autoPlay
            />
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h3>Ya tienes cuenta?</h3>
              <p>Ingresa con tus credenciales</p>
              <button
                class="btn transparent"
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
