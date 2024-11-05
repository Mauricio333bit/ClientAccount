import React, { useState } from "react";

import {
  FaChevronDown,
  FaMapPin,
  FaUsers,
  FaWindowClose,
} from "react-icons/fa";

// Datos de ejemplo para los partidos
const partidos = [
  {
    id: 1,
    cancha: "Pilar FC",
    urlMaps: "https://goo.gl/maps/123",
    monto: 10,
    horario: "18:00",
    jugadoresPorEquipo: 7,
    jugadoresUnidos: ["Juan", "Pedro", "María"],
    lugaresDisponibles: 11,
  },
  {
    id: 2,
    cancha: "Cancha Sintética 'El Canocho'",
    urlMaps: "https://goo.gl/maps/456",
    monto: 15,
    horario: "20:00",
    jugadoresPorEquipo: 5,
    jugadoresUnidos: ["Ana", "Carlos"],
    lugaresDisponibles: 8,
  },
  {
    id: 3,
    cancha: "Playon Amyso",
    urlMaps: "https://goo.gl/maps/789",
    monto: 12,
    horario: "19:30",
    jugadoresPorEquipo: 6,
    jugadoresUnidos: ["Luis", "Elena", "Roberto", "Sofia"],
    lugaresDisponibles: 8,
  },
];

const Button = ({ children, onClick, disabled, className = "" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const Input = ({
  id,
  name,
  type = "text",
  required = false,
  defaultValue = "",
}) => (
  <input
    id={id}
    name={name}
    type={type}
    required={required}
    defaultValue={defaultValue}
    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
  />
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-y-auto">
      <div
        className="bg-white rounded-lg w-full max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: "600px" }}
      >
        <div className="sticky top-0 bg-white flex justify-between items-center p-4 border-b z-10">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaWindowClose className="size-9" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default function PantallaInicial() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    console.log(selectedMatch);
    const formData = new FormData(event.currentTarget);
    console.log({
      cancha: formData.get("cancha"),
      urlMaps: formData.get("urlMaps"),
      horario: formData.get("horario"),
      monto: formData.get("monto"),
      jugadoresPorEquipo: formData.get("jugadoresPorEquipo"),
      aliasCuenta: formData.get("aliasCuenta"),
    });
    setIsCreateModalOpen(false);
  };

  const handleJoinSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      nombre: formData.get("nombre"),
      telefono: formData.get("telefono"),
      esAmigo: formData.get("esAmigo"),
      comprobante: formData.get("comprobante"),
    });
    setIsJoinModalOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-green-800 bg-opacity-80 p-4 sm:p-8"
      style={{
        backgroundImage: `url('https://img.freepik.com/vector-gratis/fondo-campo-futbol-estilo-degradado_23-2148995842.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-xl p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
          <img
            src="../../public/descarga-removebg-preview.png"
            alt="Logo de Fútbol"
            className="w-40"
          />
          <h1 className="text-2xl sm:text-4xl font-bold text-center">
            Fulbito
          </h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Crear Nuevo Partido
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cancha
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Horario
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jugadores/Equipo
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jugadores Unidos
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partidos.map((partido) => (
                <tr key={partido.id}>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <a
                      href={partido.urlMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <FaMapPin className="mr-1 h-4 w-4" />
                      {partido.cancha}
                    </a>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                    ${partido.monto}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                    {partido.horario}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                    {partido.jugadoresPorEquipo}
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <div className="relative">
                      <Button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === partido.id ? null : partido.id
                          )
                        }
                        className="flex items-center text-xs sm:text-sm"
                      >
                        <FaUsers className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">
                          {partido.jugadoresUnidos.length} Jugadores
                        </span>
                        <span className="sm:hidden">
                          {partido.jugadoresUnidos.length}
                        </span>
                        <FaChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      {openDropdown === partido.id && (
                        <div className="absolute z-10 mt-2 w-48 sm:w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            {partido.jugadoresUnidos.map((jugador, index) => (
                              <a
                                key={index}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                role="menuitem"
                              >
                                {jugador}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                    <Button
                      disabled={partido.lugaresDisponibles === 0}
                      className="text-xs sm:text-sm"
                      onClick={() => {
                        setSelectedMatch(partido);
                        setIsJoinModalOpen(true);
                      }}
                    >
                      {partido.lugaresDisponibles > 0 ? "Unirse" : "Completo"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Nuevo Partido"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="cancha"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de cancha
            </label>
            <Input id="cancha" name="cancha" required />
          </div>
          <div>
            <label
              htmlFor="urlMaps"
              className="block text-sm font-medium text-gray-700"
            >
              URL Maps
            </label>
            <Input id="urlMaps" name="urlMaps" type="url" required />
          </div>
          <div>
            <label
              htmlFor="horario"
              className="block text-sm font-medium text-gray-700"
            >
              Horario
            </label>
            <Input id="horario" name="horario" type="time" required />
          </div>
          <div>
            <label
              htmlFor="monto"
              className="block text-sm font-medium text-gray-700"
            >
              Monto por jugador
            </label>
            <Input id="monto" name="monto" type="number" required />
          </div>
          <div>
            <label
              htmlFor="jugadoresPorEquipo"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad de jugadores por equipo
            </label>
            <Input
              id="jugadoresPorEquipo"
              name="jugadoresPorEquipo"
              type="number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="aliasCuenta"
              className="block text-sm font-medium text-gray-700"
            >
              Alias de la cuenta
            </label>
            <Input id="aliasCuenta" name="aliasCuenta" required />
          </div>
          <Button type="submit" className="w-full">
            Crear Partido
          </Button>
        </form>
      </Modal>

      <Modal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        title="Unirse al Partido"
      >
        <form onSubmit={handleJoinSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <Input
              id="nombre"
              name="nombre"
              required
              defaultValue="Usuario Logueado"
            />
          </div>
          <div>
            <label
              htmlFor="telefono"
              className="block text-sm font-medium text-gray-700"
            >
              Número Telefónico
            </label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              required
              defaultValue="1234567890"
            />
          </div>
          <div className="flex items-center">
            <input
              id="esAmigo"
              name="esAmigo"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="esAmigo"
              className="ml-2 block text-sm text-gray-900"
            >
              Estoy agregando a un amigo
            </label>
          </div>
          <div>
            <label
              htmlFor="comprobante"
              className="block text-sm font-medium text-gray-700"
            >
              Comprobante de Pago
            </label>
            <input
              id="comprobante"
              name="comprobante"
              type="file"
              accept="image/*"
              required
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          <Button type="submit" className="w-full">
            Unirse al Partido
          </Button>
        </form>
      </Modal>
    </div>
  );
}
