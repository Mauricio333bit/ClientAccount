import React, { useEffect, useState } from "react";
import { FaUser, FaChartBar, FaBars, FaTimes, FaHistory } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import useClienteStore from "../store/clienteStore";

import useMovimientoStore from "../store/movimientoStore";

const loggedInEmployee = {
  id: "001",
  name: "Luis Gómez",
  email: "luis@example.com",
  role: "Vendedor",
};

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
  const [activeSection, setActiveSection] = useState("movements");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeSection) {
      case "movements":
        return <MovementsSection />;
      case "clients":
        return <ClientsSection />;
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
            <span className="hidden md:inline">{loggedInEmployee.name}</span>
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
        {/* <aside
          className={`bg-white shadow-md w-64 flex-shrink-0 ${
            isSidebarOpen ? "block" : "hidden"
          } lg:block absolute inset-y-0 left-0 z-50 lg:relative lg:z-0 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4">
            <Button
              onClick={() => {
                setActiveSection("movements");
                setIsSidebarOpen(false);
              }}
              className={`w-full justify-start mb-2 ${
                activeSection === "movements" ? "bg-blue-600" : ""
              }`}
            >
              <FaClipboardList className="mr-2" />
              Movimientos
            </Button>
            <Button
              onClick={() => {
                setActiveSection("clients");
                setIsSidebarOpen(false);
              }}
              className={`w-full justify-start mb-2 ${
                activeSection === "clients" ? "bg-blue-600" : ""
              }`}
            >
              <FaUser className="mr-2" />
              Clientes
            </Button>
            <Button
              onClick={() => {
                setActiveSection("statistics");
                setIsSidebarOpen(false);
              }}
              className={`w-full justify-start ${
                activeSection === "statistics" ? "bg-blue-600" : ""
              }`}
            >
              <FaChartBar className="mr-2" />
              Estadísticas
            </Button>
          </nav>
        </aside> */}

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function MovementsSection() {
  const [newMovement, setNewMovement] = useState({
    date: "",
    clientId: "",
    type: "",
    amount: "",
    invoiceNumber: "",
  });
  const [facturasDisponibles, setFacturasDisponibles] = useState([]);

  const { clientes } = useClienteStore();
  const { movimientos, agregarMovimiento, obtenerFacturas } =
    useMovimientoStore();

  // Efecto para actualizar las facturas disponibles cuando cambia el cliente o el tipo
  useEffect(() => {
    if (newMovement.clientId && newMovement.type === "Factura") {
      setFacturasDisponibles(obtenerFacturas());
      console.log(facturasDisponibles);
      // Filtrar las facturas del cliente seleccionado
      const facturasCliente = facturasDisponibles.filter(
        (fc) => fc.clientId === newMovement.clientId
      );
      setFacturasDisponibles(facturasCliente);
    } else {
      setFacturasDisponibles([]);
    }
  }, [newMovement.clientId, newMovement.type, movimientos]);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewMovement((prev) => ({ ...prev, [id]: value }));
  };

  const tipoMovimiento = [
    { value: "Factura", label: "Factura" },
    { value: "Recibo", label: "Recibo" },
    { value: "Nota Credito", label: "Nota Credito" },
    { value: "Nota Debito", label: "Nota Debito" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const movement = {
      ...newMovement,
      id: (movimientos.length + 1).toString().padStart(3, "0"),
      amount: parseFloat(newMovement.amount),
    };
    agregarMovimiento(movement);
    setNewMovement({
      date: "",
      clientId: "",
      type: "",
      amount: "",
      invoiceNumber: "",
    });
  };

  const showInvoiceSelect =
    newMovement.clientId &&
    newMovement.type === "Recibo" &&
    facturasDisponibles.length !== 0;

  return (
    <div className="bg-white shadow rounded-lg p-6 m-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Movimientos</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 p-4 md:p-6 rounded-lg shadow mb-6 "
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Nuevo Movimiento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Fecha"
            type="date"
            id="date"
            value={newMovement.date}
            onChange={handleInputChange}
          />
          <Select
            label="Cliente"
            id="clientId"
            value={newMovement.clientId}
            onChange={handleInputChange}
            options={clientes.map((client) => ({
              value: client.id,
              label: client.name,
            }))}
          />
          <Select
            label="Tipo"
            id="type"
            value={newMovement.type}
            onChange={handleInputChange}
            options={tipoMovimiento}
          />
          <Input
            label="Monto"
            type="number"
            id="amount"
            value={newMovement.amount}
            onChange={handleInputChange}
          />
          {newMovement.type === "Recibo" && (
            <div>
              <label
                htmlFor="invoiceNumber"
                className="block text-sm font-medium mb-1"
              >
                Número de Documento
              </label>
              {showInvoiceSelect ? (
                <select
                  id="invoiceNumber"
                  value={newMovement.invoiceNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Seleccionar Factura</option>
                  {facturasDisponibles.map((factura) => (
                    <option key={factura.id} value={factura.invoiceNumber}>
                      {factura.invoiceNumber}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  id="invoiceNumber"
                  value={newMovement.invoiceNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              )}
            </div>
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
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Identificador
              </th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((movement) => (
              <tr key={movement.id}>
                <td className="px-4 py-2 whitespace-nowrap">{movement.date}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {clientes.find((c) => c.id === movement.clientId)?.name ||
                    "N/A"}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{movement.type}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  ${movement.amount.toFixed(2)}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {movement.invoiceNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClientsSection() {
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { agregarCliente, clientes } = useClienteStore();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewClient((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cliente = {
      ...newClient,
      id: (clientes.length + 1).toString().padStart(3, "0"),
    };
    agregarCliente(cliente);
    setNewClient({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 m-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Clientes</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 p-4 md:p-6 rounded-lg shadow mb-6"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4">Nuevo Cliente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            id="name"
            value={newClient.name}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            type="email"
            id="email"
            value={newClient.email}
            onChange={handleInputChange}
          />
          <Input
            label="Teléfono"
            id="phone"
            value={newClient.phone}
            onChange={handleInputChange}
          />
        </div>
        <Button type="submit" className="mt-4 w-full md:w-auto">
          Agregar Cliente
        </Button>
      </form>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow overflow-x-auto">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Lista de Clientes
        </h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-2 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Teléfono
              </th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((client) => (
              <tr key={client.id}>
                <td className="px-4 py-2 whitespace-nowrap">{client.id}</td>
                <td className="px-4 py-2 whitespace-nowrap">{client.name}</td>
                <td className="px-4 py-2  whitespace-nowrap">{client.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">{client.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatisticsSection() {
  const { movimientos } = useMovimientoStore();
  const totalSales = movimientos
    .filter((m) => m.type === "Venta")
    .reduce((sum, m) => sum + m.amount, 0);

  const totalCollections = movimientos
    .filter((m) => m.type === "Cobro")
    .reduce((sum, m) => sum + m.amount, 0);

  const totalRemitos = movimientos
    .filter((m) => m.type === "Remito")
    .reduce((sum, m) => sum + m.amount, 0);

  const movementsByType = movimientos.reduce((acc, m) => {
    acc[m.type] = (acc[m.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="bg-white shadow rounded-lg p-6 m-5">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Ventas Totales
          </h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">
            ${totalSales.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Cobros Totales
          </h3>
          <p className="text-2xl md:text-3xl font-bold text-green-600">
            ${totalCollections.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <h3 className="text-lg md:text-xl font-semibold mb-2">
            Total en Remitos
          </h3>
          <p className="text-2xl md:text-3xl font-bold text-yellow-600">
            ${totalRemitos.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="mt-6 bg-slate-200 p-4 md:p-6 rounded-lg shadow">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Movimientos por Tipo
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(movementsByType).map(([type, count]) => (
            <div key={type} className="text-center">
              <p className="text-xl md:text-2xl font-bold text-gray-800">
                {count}
              </p>
              <p className="text-gray-900">{type}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
