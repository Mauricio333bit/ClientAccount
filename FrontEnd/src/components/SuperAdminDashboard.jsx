
import React, { useState, useEffect } from "react";

import {
  FaUsers,
  FaCreditCard,
  FaChartLine,
  FaBars,
  FaTimes,
  FaPlus,
  FaChartBar,
  FaUser,
} from "react-icons/fa";
import { ImExit } from "react-icons/im";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAccountStore from "../store/accountStore";
import useMovimientoStore from "../store/movimientoStore"; 

// import useClienteStore from "../store/clienteStore";

// Datos clientes

const initialAccounts = [
  {
    id: "001",
    name: "Juan Pérez",
    email: "juan@example.com",
    type: "Minorista",
  },
  {
    id: "002",
    name: "María González",
    email: "maria@example.com",
    type: "Mayorista",
  },
  {
    id: "003",
    name: "Carlos Rodríguez",
    email: "carlos@example.com",
    type: "Distribuidor",
  },
  {
    id: "004",
    name: "Ana Martínez",
    email: "ana@example.com",
    type: "Minorista",
  },
];

const initialUsers = [
  {
    id: "001",
    name: "Luis Gómez",
    email: "luis@example.com",
    role: "Vendedor",
  },
  {
    id: "002",
    name: "Elena Torres",
    email: "elena@example.com",
    role: "Cajera",
  },
  {
    id: "003",
    name: "Roberto Sánchez",
    email: "roberto@example.com",
    role: "Administrador",
  },
];

const initialMovements = [
  {
    id: "001",
    date: "2023-05-15",
    userId: "001",
    accountId: "001",
    type: "Venta",
    amount: 500,
  },
  {
    id: "002",
    date: "2023-05-14",
    userId: "002",
    accountId: "002",
    type: "Devolución",
    amount: -200,
  },
  {
    id: "003",
    date: "2023-05-13",
    userId: "001",
    accountId: "003",
    type: "Remito",
    amount: 1000,
  },
  {
    id: "004",
    date: "2023-05-12",
    userId: "003",
    accountId: "004",
    type: "Venta",
    amount: 800,
  },
  {
    id: "005",
    date: "2023-05-11",
    userId: "002",
    accountId: "001",
    type: "Cobro",
    amount: 300,
  },
  {
    id: "006",
    date: "2023-05-10",
    userId: "001",
    accountId: "002",
    type: "Venta",
    amount: 750,
  },
  {
    id: "007",
    date: "2023-05-09",
    userId: "003",
    accountId: "003",
    type: "Devolución",
    amount: -150,
  },
  {
    id: "008",
    date: "2023-05-08",
    userId: "002",
    accountId: "004",
    type: "Remito",
    amount: 600,
  },
  {
    id: "009",
    date: "2023-05-07",
    userId: "001",
    accountId: "001",
    type: "Venta",
    amount: 450,
  },
  {
    id: "010",
    date: "2023-05-06",
    userId: "003",
    accountId: "002",
    type: "Cobro",
    amount: 900,
  },
  {
    id: "011",
    date: "2023-05-05",
    userId: "002",
    accountId: "003",
    type: "Venta",
    amount: 550,
  },
  {
    id: "012",
    date: "2023-05-04",
    userId: "001",
    accountId: "004",
    type: "Devolución",
    amount: -100,
  },
  {
    id: "013",
    date: "2023-05-03",
    userId: "003",
    accountId: "001",
    type: "Remito",
    amount: 700,
  },
  {
    id: "014",
    date: "2023-05-02",
    userId: "002",
    accountId: "002",
    type: "Venta",
    amount: 850,
  },
  {
    id: "015",
    date: "2023-05-01",
    userId: "001",
    accountId: "003",
    type: "Cobro",
    amount: 1200,
  },
  {
    id: "016",
    date: "2023-04-30",
    userId: "003",
    accountId: "004",
    type: "Venta",
    amount: 950,
  },
];

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
  name,
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
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded ${className}`}
    />
  </div>
);

const Select = ({
  label,
  id,
  name,
  value,
  options,
  onChange,
  className = "",
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2">
      {label}
    </label>
    <select
      id={id}
      name={name}
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

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("cuentas");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  //clientes
  const [accounts, setAccounts] = useState(initialAccounts);

  const [users, setUsers] = useState(initialUsers);
  const [movements, setMovements] = useState(initialMovements);

  const renderContent = () => {
    switch (activeSection) {
      case "cuentas":
        return (
          <CuentasSection
            accounts={accounts}
            setAccounts={setAccounts}
            movements={movements}
          />
        );
      case "usuarios":
        return <UsuariosSection users={users} setUsers={setUsers} />;
      case "movimientos":
        return (
          <MovimientosSection
            movements={movements}
            setMovements={setMovements}
            users={users}
            accounts={accounts}
          />
        );
      case "estadisticas":
        return (
          <EstadisticasSection accounts={accounts} movements={movements} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen  bg-gradient-to-r from-blue-800 to-sky-500">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden"
        >
          <FaBars className="h-6 w-6" />
        </button>
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
              onClick={() => setActiveSection("cuentas")}
              className={`w-full text-left py-2 px-4 rounded mb-2 flex items-center ${
                activeSection === "cuentas"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaCreditCard className="mr-2" />
              Clientes
            </button>
            <button
              onClick={() => setActiveSection("usuarios")}
              className={`w-full text-left py-2 px-4 rounded mb-2 flex items-center ${
                activeSection === "usuarios"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaUsers className="mr-2" />
              Usuarios
            </button>
            <button
              onClick={() => setActiveSection("movimientos")}
              className={`w-full text-left py-2 px-4 rounded mb-2 flex items-center ${
                activeSection === "movimientos"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaChartLine className="mr-2" />
              Movimientos
            </button>
            <button
              onClick={() => setActiveSection("estadisticas")}
              className={`w-full text-left py-2 px-4 rounded flex items-center ${
                activeSection === "estadisticas"
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
            <span className="hidden md:inline">Admin</span>
            <button
              type="button"
              className="hover:text-red-600 mx-2 "
              data-twe-placement="right"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              title="Cerrar  sesion"
            >
              <ImExit size={30} />
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
}

function CuentasSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
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
    const { name, value } = e.target;
    console.log(name, value);
    setNewClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleTypeChange = (e) => {
  //   setNewClient((prev) => ({
  //     ...prev,
  //     type: e.target.value,
  //   }));
  // };

  const validateForm = () => {
    const requiredFields = ["name", "email", "cuit", "password", "type"];
    for (const field of requiredFields) {
      if (!newClient[field]) {
        alert(`El campo ${field} es obligatorio`);
        return false;
      }
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newClient.email)) {
      alert("El formato del email no es válido");
      return false;
    }

    // Validar CUIT (asumiendo formato argentino: 11 dígitos)
    const cuitRegex = /^\d{11}$/;
    if (!cuitRegex.test(newClient.cuit)) {
      alert("El CUIT debe tener 11 dígitos");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newClient);
    if (!validateForm()) return;

    // Preparar datos de la cuenta
    const accountData = {
      ...newClient,
      rol: "cliente",
      balance: 0,
      idEmployed: 123,
    };
    console.log(accountData);

    // Agregar la cuenta
    addAccount(accountData);

    // Resetear el formulario
    setNewClient({
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
    (account) => account.rol === "cliente" && account.idEmployed
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Clientes</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2" />
          Nuevo Cliente
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID Cliente
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {clientAccounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap">{account.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {account.balance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar Nuevo Cliente"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 p-4 md:p-6 rounded-lg shadow mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre"
              name="name"
              value={newClient.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={newClient.email}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <Input
              label="CUIT"
              name="cuit"
              value={newClient.cuit}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Teléfono"
              name="phone"
              value={newClient.phone}
              onChange={handleInputChange}
            />
            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={newClient.password}
              onChange={handleInputChange}
              required
            />
            <Select
              label="Tipo de cliente"
              name="type"
              options={tipoCliente}
              onChange={handleInputChange}
              value={newClient.type}
              required
            />
          </div>
          <Button type="submit" className="mt-4 w-full md:w-auto">
            Crear Cuenta de Cliente
          </Button>
        </form>
      </Modal>
    </div>
  );
}

function UsuariosSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const typeAccount = [
    { value: "empleado", label: "Empleado" },
    { value: "administrador", label: "Administrador" },
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleTypeChange = (e) => {
  //   setNewAccount((prev) => ({
  //     ...prev,
  //     type: e.target.value,
  //   }));
  // };

  const validateForm = () => {
    const requiredFields = ["name", "email", "cuit", "password", "rol"];
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
    console.log(newAccount);
    if (!validateForm()) return;

    // Preparar datos de la cuenta
    const accountData = {
      ...newAccount,

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
  console.log(accounts);
  // Filtrar solo las cuentas que no son clientes
  const users = accounts.filter(
    (account) => account.rol == "empleado" || account.rol == "administrador"
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Usuarios</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2" />
          Nuevo Usuario
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Rol: {user.rol}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar Usuario"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 p-4 md:p-6 rounded-lg shadow mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nombre"
              name="name"
              value={newAccount.name}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={newAccount.email}
              onChange={(e) => handleInputChange(e)}
              required
            />
            <Input
              label="CUIT"
              name="cuit"
              value={newAccount.cuit}
              onChange={handleInputChange}
              required
            />
            <Input
              label="Teléfono"
              name="phone"
              value={newAccount.phone}
              onChange={handleInputChange}
            />
            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={newAccount.password}
              onChange={handleInputChange}
              required
            />
            <Select
              label="Rol"
              name="rol"
              options={typeAccount}
              onChange={handleInputChange}
              value={newAccount.type}
              required
            />
          </div>
          <Button type="submit" className="mt-4 w-full md:w-auto">
            Crear Usuario
          </Button>
        </form>
      </Modal>
    </div>
  );
}








function MovimientosSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    accounts
  } = useAccountStore();
  const {
    movimientos,
    agregarMovimiento,
    eliminarMovimiento,
    loadFromSessionStorage,
  } = useMovimientoStore();
console.log(movimientos)
  useEffect(() => {
    // Cargar movimientos desde sessionStorage al montar el componente
    loadFromSessionStorage();
  }, [loadFromSessionStorage]);

  const handleAddMovement = (newMovement) => {
    agregarMovimiento(newMovement, () => {}); // Callback opcional
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Movimientos</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Usuario (Empleado)
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {movimientos && movimientos.length > 0 ? (
              movimientos.map((movement) => {
                // Buscar datos del empleado (usuario) y cliente
                const empleado = accounts.find(
                  (account) =>
                    account.id === movement.employeeId && account.rol == "empleado"
                );
                const cliente = accounts.find(
                  (account) =>
                    account.id === movement.accountId && account.rol == "cliente"
                ); 

                return (
                  <tr key={movement.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{movement.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {empleado ? empleado.name : "Empleado no encontrado"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {cliente ? cliente.name : "Cliente no encontrado"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{movement.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${movement.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => eliminarMovimiento(movement.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500">
                  No hay movimientos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar Nuevo Movimiento"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newMovement = {
              date: e.target.date.value,
              userId: e.target.userId.value,
              accountId: e.target.accountId.value,
              type: e.target.type.value,
              amount: parseFloat(e.target.amount.value),
            };
            handleAddMovement(newMovement);
          }}
        >
          <Input label="Fecha" id="date" type="date" />
          <Select
            label="Usuario (Empleado)"
            id="userId"
            options={accounts
              .filter((account) => account.rol === "empleado")
              .map((empleado) => ({
                value: empleado.id,
                label: empleado.name || "Empleado sin nombre",
              }))}
          />
          <Select
            label="Cliente"
            id="accountId"
            options={accounts
              .filter((account) => account.rol === "cliente")
              .map((cliente) => ({
                value: cliente.id,
                label: cliente.name || "Cliente sin nombre",
              }))}
          />
          <Select
            label="Tipo"
            id="type"
            options={[
              { value: "Venta", label: "Venta" },
              { value: "Devolución", label: "Devolución" },
              { value: "Remito", label: "Remito" },
              { value: "Cobro", label: "Cobro" },
            ]}
          />
          <Input label="Monto" id="amount" type="number" step="0.01" />
          <Button type="submit" className="w-full mt-4">
            Registrar Movimiento
          </Button>
        </form>
      </Modal>
    </div>
  );
}







function EstadisticasSection({ accounts, movements }) {
  const ventasPorMes = [
    { name: "Ene", ventas: 4000 },
    { name: "Feb", ventas: 3000 },
    { name: "Mar", ventas: 5000 },
    { name: "Abr", ventas: 4500 },
    { name: "May", ventas: 6000 },
    { name: "Jun", ventas: 5500 },
  ];

  const clientesPorTipo = accounts.reduce((acc, account) => {
    acc[account.type] = (acc[account.type] || 0) + 1;
    return acc;
  }, {});

  const clientesPorTipoData = Object.entries(clientesPorTipo).map(
    ([name, value]) => ({ name, value })
  );

  const totalMovements = movements.length;
  const totalAmount = movements.reduce(
    (sum, movement) => sum + movement.amount,
    0
  );
  const averageMovementAmount = totalAmount / totalMovements;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Estadísticas</h2>
      <div className="bg-white p-4 my-2 rounded-lg shadow col-span-1 md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Resumen de Métricas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              ${totalAmount.toFixed(2)}
            </p>
            <p className="text-gray-600">Monto Total de Movimientos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {accounts.length}
            </p>
            <p className="text-gray-600">Total de Clientes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {totalMovements}
            </p>
            <p className="text-gray-600">Total de Movimientos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              ${averageMovementAmount.toFixed(2)}
            </p>
            <p className="text-gray-600">Monto Promedio por Movimiento</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Ventas Mensuales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ventasPorMes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">
            Distribución de Clientes
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clientesPorTipoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
