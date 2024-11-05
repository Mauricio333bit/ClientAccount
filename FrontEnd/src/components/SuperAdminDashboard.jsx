import React, { useState } from "react";
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

// Datos precargados
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

const Input = ({ label, type = "text", id, className = "" }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className={`w-full px-3 py-2 border rounded ${className}`}
    />
  </div>
);

const Select = ({ label, id, options, className = "" }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block mb-2">
      {label}
    </label>
    <select id={id} className={`w-full px-3 py-2 border rounded ${className}`}>
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

function CuentasSection({ accounts, setAccounts, movements }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addAccount = (newAccount) => {
    setAccounts([
      ...accounts,
      { ...newAccount, id: (accounts.length + 1).toString().padStart(3, "0") },
    ]);
    setIsModalOpen(false);
  };

  const calculateBalance = (accountId) => {
    return movements
      .filter((movement) => movement.accountId === accountId)
      .reduce((sum, movement) => sum + movement.amount, 0);
  };

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
            {accounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap">{account.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{account.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${calculateBalance(account.id).toFixed(2)}
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
          onSubmit={(e) => {
            e.preventDefault();
            const newAccount = {
              name: e.target.name.value,
              email: e.target.email.value,
              type: e.target.type.value,
            };
            addAccount(newAccount);
          }}
        >
          <Input label="Nombre" id="name" />
          <Input label="Email" id="email" type="email" />
          <Select
            label="Tipo"
            id="type"
            options={[
              { value: "Minorista", label: "Minorista" },
              { value: "Mayorista", label: "Mayorista" },
              { value: "Distribuidor", label: "Distribuidor" },
            ]}
          />
          <Button type="submit" className="w-full mt-4">
            Crear Cliente
          </Button>
        </form>
      </Modal>
    </div>
  );
}

function UsuariosSection({ users, setUsers }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addUser = (newUser) => {
    setUsers([
      ...users,
      { ...newUser, id: (users.length + 1).toString().padStart(3, "0") },
    ]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Usuarios</h2>
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
            <p>Rol: {user.role}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Agregar Nuevo Usuario"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newUser = {
              name: e.target.name.value,
              email: e.target.email.value,
              role: e.target.role.value,
            };
            addUser(newUser);
          }}
        >
          <Input label="Nombre" id="name" />
          <Input label="Email" id="email" type="email" />
          <Select
            label="Rol"
            id="role"
            options={[
              { value: "Vendedor", label: "Vendedor" },
              { value: "Cajero", label: "Cajero" },
              { value: "Administrador", label: "Administrador" },
            ]}
          />
          <Button type="submit" className="w-full mt-4">
            Crear Usuario
          </Button>
        </form>
      </Modal>
    </div>
  );
}

function MovimientosSection({ movements, setMovements, users, accounts }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addMovement = (newMovement) => {
    setMovements([
      {
        ...newMovement,
        id: (movements.length + 1).toString().padStart(3, "0"),
      },
      ...movements,
    ]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Movimientos</h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <FaPlus className="mr-2" />
          Nuevo Movimiento
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Usuario
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
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td className="px-6 py-4 whitespace-nowrap">{movement.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {users.find((u) => u.id === movement.userId)?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {accounts.find((a) => a.id === movement.accountId)?.name ||
                    "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{movement.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${movement.amount.toFixed(2)}
                </td>
              </tr>
            ))}
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
            addMovement(newMovement);
          }}
        >
          <Input label="Fecha" id="date" type="date" />
          <Select
            label="Usuario"
            id="userId"
            options={users.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
          />
          <Select
            label="Cliente"
            id="accountId"
            options={accounts.map((account) => ({
              value: account.id,
              label: account.name,
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
