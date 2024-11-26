import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ClientDashboard from "./components/ClientDashboard";
import PantallaInicial from "./components/Pantalla-inicial";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/administrador" element={<SuperAdminDashboard />} />
          <Route path="/empleado" element={<EmployeeDashboard />} />
          <Route path="/cliente" element={<ClientDashboard />} />
          <Route path="/fulvo" element={<PantallaInicial />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
