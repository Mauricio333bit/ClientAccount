import React, { useState } from "react";
import { FaUser, FaChartBar, FaBars, FaTimes, FaHistory } from "react-icons/fa";
import { ImExit } from "react-icons/im";

import useAccountStore, { ROLES } from "../store/accountStore";

import useMovimientoStore from "../store/movimientoStore";
import { tiposMovimiento } from "../store/movimientoStore";
import { useNavigate } from "react-router-dom";

// const loggedInEmployee = {
//   id: "001",
//   name: "Luis Gómez",
//   email: "luis@example.com",
//   role: "Vendedor",
// };

const Button = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 w-4/12 bg-blue-900 flex items-center justify-center text-white rounded hover:bg-blue-600 ${className}`}
  >
    {children}
  </button>
);

const Input = ({
  label,
  type = "text",
  id,
  value,
  onChange,
  className = "",
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded ${className}`}
    />
  </div>
);

const Select = ({ label, id, options, value, onChange, className = "" }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
  };
  const [activeSection, setActiveSection] = useState("movements");
  const { loggedAccount } = useAccountStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case "movements":
        return <MovementsSection />;
      case "clients":
        return <ClientAccountsSection />;
      case "statistics":
        return <StatisticsSection />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-blue-800 to-sky-500">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 lg:hidden"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Dashboard de Empleado
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`bg-white shadow-md w-64 flex-shrink-0 ${
            isSidebarOpen ? "" : "hidden"
          }  flex flex-col justify-between absolute inset-y-0 left-0 z-50 lg:relative lg:z-0 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4">
            <button
              onClick={() => {
                setActiveSection("movements");
              }}
              className={`w-full text-left py-2 px-4 rounded mb-2 flex items-center ${
                activeSection === "movements"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaHistory className="mr-2" />
              Movimientos
            </button>
            <button
              onClick={() => {
                setActiveSection("clients");
              }}
              className={`w-full text-left py-2 px-4 rounded mb-2 flex items-center ${
                activeSection === "clients"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaUser className="mr-2" />
              Clientes
            </button>
            <button
              onClick={() => {
                setActiveSection("statistics");
              }}
              className={`w-full text-left py-2 px-4 rounded flex items-center ${
                activeSection === "statistics"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaChartBar className="mr-2" />
              Estadísticas
            </button>
          </nav>
          <div className="flex justify-center items-center py-3">
            <FaUser className="mr-2" />
            <span className="hidden md:inline">{loggedAccount.name}</span>
            <button
              type="button"
              className="hover:text-red-600 mx-2 "
              data-twe-placement="right"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              title="Cerrar  sesion"
              onClick={() => logout()}
            >
              <ImExit size={30} />
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function MovementsSection() {
  const { accounts, loggedAccount, updateBalance } = useAccountStore();
  const { movimientos, agregarMovimiento } = useMovimientoStore();
  const [newMovement, setNewMovement] = useState({
    date: new Date().toISOString().slice(0, 10), // Inicializamos con la fecha actual
    accountId: "",
    employeeId: (loggedAccount && loggedAccount.id) || 123,
    type: "",
    amount: "",
    invoiceNumber: "",
  });

  // filtrar solo las cuentas de clientes
  const clientAccounts = accounts.filter(
    (account) => account.rol === "cliente"
  );
  console.log("clientes", clientAccounts);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewMovement((prev) => ({ ...prev, [id]: value }));
  };

  const handleAccountChange = (e) => {
    const selectedAccountId = e.target.value;
    console.log(" id cliente seleccionado", selectedAccountId);
    setNewMovement((prev) => ({
      ...prev,
      accountId: selectedAccountId,
    }));
  };

  const validateFields = () => {
    const { type, amount, invoiceNumber, accountId } = newMovement;
    console.log("data new moevimeinto", newMovement);
    if (type === "Recibo" && !invoiceNumber) {
      alert("Por favor indica el numero que asocia la factura");
      return false;
    }
    if (!type || !amount || !accountId) {
      alert("Por favor, completa todos los campos obligatorios.");
      return false;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("El monto debe ser un número válido y mayor que cero.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    // if (!loggedAccount?.id) {
    //   alert("No hay un empleado conectado. Por favor, inicia sesión.");
    //   return;
    // }

    const movement = {
      ...newMovement,
      id: Date.now(), // Generamos un ID único basado en timestamp
      date: new Date().toISOString().slice(0, 10),
      amount: parseFloat(newMovement.amount),
    };

    agregarMovimiento(movement, updateBalance);

    // Reseteamos el formulario manteniendo el empleado logueado y la fecha actual
    setNewMovement({
      date: new Date().toISOString().slice(0, 10),
      accountId: "",
      employeeId: loggedAccount.id,
      type: "",
      amount: "",
      invoiceNumber: "",
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 m-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Movimientos</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 p-4 md:p-6 rounded-lg shadow mb-6"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Nuevo Movimiento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Cliente"
            id="accountId"
            value={newMovement.accountId}
            onChange={handleAccountChange}
            options={clientAccounts.map((account) => ({
              value: account.id,
              label: account.name,
            }))}
          />

          <Select
            label="Tipo"
            id="type"
            value={newMovement.type}
            onChange={handleInputChange}
            options={tiposMovimiento}
          />
          <Input
            label="Monto"
            type="number"
            id="amount"
            value={newMovement.amount}
            onChange={handleInputChange}
          />
          {newMovement.type === "Recibo" && (
            <Input
              label="Número de Documento"
              id="invoiceNumber"
              value={newMovement.invoiceNumber}
              onChange={handleInputChange}
            />
          )}
        </div>
        <Button type="submit" className="mt-4 w-full md:w-auto">
          Agregar Movimiento
        </Button>
      </form>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow overflow-x-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Movimientos Recientes
        </h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Cliente
              </th>

              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Monto
              </th>
              {/* <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Identificador
              </th> */}
            </tr>
          </thead>
          <tbody>
            {movimientos && movimientos.length > 0 ? (
              movimientos.map((movement) => (
                <tr key={movement.id}>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {movement.date}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {accounts.find((a) => a.id === movement.accountId)?.name ||
                      "N/A"}
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap">
                    {movement.type}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    ${movement.amount.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                  No se han cargado movimientos aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientAccountsSection() {
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    phone: "",
    cuit: "",
    type: "",
    password: "",
    idEmployed: "",
  });

  const { accounts, addAccount } = useAccountStore();

  const tipoCliente = [
    { value: "Mayorista", label: "Mayorista" },
    { value: "Minorista", label: "Minorista" },
    { value: "Distribuidor", label: "Distribuidor" },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [id]: value }));
  };

  const handleTypeChange = (e) => {
    setNewAccount((prev) => ({
      ...prev,
      type: e.target.value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ["name", "email", "cuit", "password", "type"];
    for (const field of requiredFields) {
      if (!newAccount[field]) {
        alert(`El campo ${field} es obligatorio`);
        return false;
      }
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAccount.email)) {
      alert("El formato del email no es válido");
      return false;
    }

    // Validar CUIT (asumiendo formato argentino: 11 dígitos)
    const cuitRegex = /^\d{11}$/;
    if (!cuitRegex.test(newAccount.cuit)) {
      alert("El CUIT debe tener 11 dígitos");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Preparar datos de la cuenta
    const accountData = {
      ...newAccount,
      rol: ROLES.CLIENTE,
      balance: 0,
      idEmployed: 123,
    };
    console.log(accountData);

    // Agregar la cuenta
    addAccount(accountData);

    // Resetear el formulario
    setNewAccount({
      name: "",
      email: "",
      phone: "",
      cuit: "",
      type: "",
      password: "",
    });
  };

  // Filtrar solo las cuentas de clientes
  const clientAccounts = accounts.filter(
    (account) => account.rol === ROLES.CLIENTE && account.idEmployed
  );

  return (
    <div className="bg-white shadow rounded-lg p-6 m-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">
        Cuentas de Clientes
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 p-4 md:p-6 rounded-lg shadow mb-6"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Nueva Cuenta de Cliente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            id="name"
            value={newAccount.name}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Email"
            type="email"
            id="email"
            value={newAccount.email}
            onChange={handleInputChange}
            required
          />
          <Input
            label="CUIT"
            id="cuit"
            value={newAccount.cuit}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Teléfono"
            id="phone"
            value={newAccount.phone}
            onChange={handleInputChange}
          />
          <Input
            label="Contraseña"
            type="password"
            id="password"
            value={newAccount.password}
            onChange={handleInputChange}
            required
          />
          <Select
            label="Tipo de cliente"
            id="type"
            options={tipoCliente}
            onChange={handleTypeChange}
            value={newAccount.type}
            required
          />
        </div>
        <Button type="submit" className="mt-4 w-full md:w-auto">
          Crear Cuenta de Cliente
        </Button>
      </form>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow overflow-x-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Clientes añadidos recientemente
        </h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>

              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                CUIT
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {clientAccounts.map((account) => (
              <tr key={account.id}>
                <td className="px-4 py-2 whitespace-nowrap">{account.name}</td>

                <td className="px-4 py-2 whitespace-nowrap">{account.cuit}</td>
                <td className="px-4 py-2 whitespace-nowrap">{account.type}</td>
                <td
                  className={`px-4 py-2 whitespace-nowrap ${
                    account.balance < 0 ? "text-red-500" : "text-black"
                  }`}
                >
                  ${account.balance?.toFixed(2)}
                </td>
                <td
                  className={`px-4 py-2 whitespace-nowrap ${
                    account.balance < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {account.balance < 0 ? "Deudor" : "Al día"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatisticsSection() {
  const { movements = [] } = useMovimientoStore(); // Asigna un array vacío por defecto
  const { accounts = [] } = useAccountStore(); // Asigna un array vacío por defecto

  // Calcular totales por tipo de movimiento
  const totalsByType = movements.reduce((totals, movement) => {
    if (!totals[movement.type]) {
      totals[movement.type] = {
        count: 0,
        amount: 0,
      };
    }
    totals[movement.type].count += 1;
    totals[movement.type].amount += movement.amount;
    return totals;
  }, {});

  // Calcular estadísticas de cuentas
  const accountStats = {
    totalAccounts: accounts.filter((account) => account.rol === "CLIENTE")
      .length,
    totalDebtors: accounts.filter((account) => account.balance < 0).length,
    totalUpToDate: accounts.filter((account) => account.balance >= 0).length,
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 m-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Object.entries(totalsByType).map(([type, data]) => (
          <div key={type} className="bg-white p-4 md:p-6 rounded-lg shadow">
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Total {type}
            </h3>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">
              ${data.amount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Cantidad: {data.count}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-slate-200 p-4 md:p-6 rounded-lg shadow">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Estado de Cuentas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-gray-800">
              {accountStats.totalAccounts}
            </p>
            <p className="text-gray-900">Total Clientes</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-red-600">
              {accountStats.totalDebtors}
            </p>
            <p className="text-gray-900">Deudores</p>
          </div>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-bold text-green-600">
              {accountStats.totalUpToDate}
            </p>
            <p className="text-gray-900">Al día</p>
          </div>
        </div>
      </div>
    </div>
  );
}
