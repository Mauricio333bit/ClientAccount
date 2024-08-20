import Inicio from "./pages/Inicio";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/admin" element={"Estas en el panel de admin"} />
        <Route
          path="/admin/accounts"
          element={"Estas en el panel de admin,seccion cuentas"}
        />
        <Route
          path="/account/home"
          element={"Estas en el inicio de la cuenta usuario"}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
