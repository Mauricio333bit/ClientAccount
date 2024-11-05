import React, { useState } from "react";
import {
  FaUser,
  FaHistory,
  FaWallet,
  FaEdit,
  FaBars,
  FaTimes,
  FaFileInvoiceDollar,
  FaCreditCard,
} from "react-icons/fa";
import { ImExit } from "react-icons/im";

// Datos de ejemplo
const clientData = {
  id: "001",
  name: "Juan Pérez",
  email: "juan@example.com",
  phone: "1234567890",
  balance: 1500.0,
  creditLimit: 5000.0,
};

const initialMovements = [
  {
    id: "001",
    date: "2023-05-15",
    type: "Factura",
    amount: 500,
    invoiceNumber: "F001",
  },
  {
    id: "002",
    date: "2023-05-14",
    type: "Pago",
    amount: -1000,
    invoiceNumber: "P001",
  },
  {
    id: "003",
    date: "2023-05-13",
    type: "Remito",
    amount: 750,
    invoiceNumber: "R001",
  },
  {
    id: "004",
    date: "2023-05-12",
    type: "Crédito",
    amount: 2000,
    invoiceNumber: "C001",
  },
];

export default function ClientDashboard() {
  const [activeSection, setActiveSection] = useState("movements");
  const [movements] = useState(initialMovements);
  const [clientInfo, setClientInfo] = useState(clientData);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case "movements":
        return <MovementsSection movements={movements} openModal={openModal} />;
      case "account":
        return (
          <AccountSection
            balance={clientInfo.balance}
            creditLimit={clientInfo.creditLimit}
            openModal={openModal}
          />
        );
      case "profile":
        return (
          <ProfileSection
            clientInfo={clientInfo}
            setClientInfo={setClientInfo}
          />
        );
      default:
        return null;
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div
      className="flex flex-col h-screen bg-gradient-to-r from-blue-800 to-sky-500 
"
    >
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 lg:hidden"
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Dashboard de Cliente
          </h1>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden ">
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
                setActiveSection("account");
              }}
              className={`w-full text-left py-2 px-4 rounded mb-2 flex items-center ${
                activeSection === "account"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaWallet className="mr-2" />
              Estado de Cuenta
            </button>
            <button
              onClick={() => {
                setActiveSection("profile");
              }}
              className={`w-full text-left py-2 px-4 rounded flex items-center ${
                activeSection === "profile"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              <FaEdit className="mr-2" />
              Editar Perfil
            </button>
          </nav>
          <div className="flex justify-center items-center py-3">
            <FaUser className="mr-2" />
            <span className="hidden md:inline">{clientInfo.name}</span>
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

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{modalContent.title}</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <FaTimes />
              </button>
            </div>
            {modalContent.content}
          </div>
        </div>
      )}
    </div>
  );
}

function MovementsSection({ movements, openModal }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Últimos Movimientos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Factura/Remito
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td className="px-6 py-4 whitespace-nowrap">{movement.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{movement.type}</td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${
                    movement.amount < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ${Math.abs(movement.amount).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {movement.invoiceNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() =>
            openModal({
              title: "Pagar Factura",
              content: <PayInvoiceForm />,
            })
          }
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded flex items-center"
        >
          <FaFileInvoiceDollar className="mr-2" />
          Pagar Factura
        </button>
      </div>
    </div>
  );
}

function AccountSection({ balance, creditLimit, openModal }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Estado de Cuenta</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg font-semibold mb-2">Saldo Actual</p>
          <p
            className={`text-3xl font-bold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${balance.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-lg font-semibold mb-2">Límite de Crédito</p>
          <p className="text-3xl font-bold text-blue-600">
            ${creditLimit.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() =>
            openModal({
              title: "Solicitar Crédito",
              content: <RequestCreditForm />,
            })
          }
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded flex items-center"
        >
          <FaCreditCard className="mr-2" />
          Solicitar Crédito
        </button>
      </div>
    </div>
  );
}

function ProfileSection({ clientInfo, setClientInfo }) {
  const [editedInfo, setEditedInfo] = useState(clientInfo);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditedInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setClientInfo(editedInfo);
    // Aquí iría la lógica para enviar los datos actualizados al servidor
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            value={editedInfo.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={editedInfo.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            value={editedInfo.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

function PayInvoiceForm() {
  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="invoiceNumber"
          className="block text-sm font-medium text-gray-700"
        >
          Número de Factura
        </label>
        <input
          type="text"
          id="invoiceNumber"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Monto
        </label>
        <input
          type="number"
          id="amount"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Confirmar Pago
      </button>
    </form>
  );
}

function RequestCreditForm() {
  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="creditAmount"
          className="block text-sm font-medium text-gray-700"
        >
          Monto de Crédito
        </label>
        <input
          type="number"
          id="creditAmount"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
      >
        Enviar Solicitud
      </button>
    </form>
  );
}
