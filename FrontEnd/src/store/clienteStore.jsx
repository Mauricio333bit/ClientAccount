import { create } from "zustand";

const useClienteStore = create((set) => ({
  // Estado inicial
  clientes: [],
  clienteSeleccionado: null,
  isLoading: false,
  error: null,

  // Implementación de acciones
  agregarCliente: (cliente) =>
    set((state) => ({
      clientes: [...state.clientes, cliente],
      error: null,
    })),

  eliminarCliente: (id) =>
    set((state) => ({
      clientes: state.clientes.filter((cliente) => cliente.id !== id),
      clienteSeleccionado:
        state.clienteSeleccionado?.id === id ? null : state.clienteSeleccionado,
      error: null,
    })),

  actualizarCliente: (id, clienteActualizado) =>
    set((state) => ({
      clientes: state.clientes.map((cliente) =>
        cliente.id === id ? { ...cliente, ...clienteActualizado } : cliente
      ),
      clienteSeleccionado:
        state.clienteSeleccionado?.id === id
          ? { ...state.clienteSeleccionado, ...clienteActualizado }
          : state.clienteSeleccionado,
      error: null,
    })),

  seleccionarCliente: (id) =>
    set((state) => ({
      clienteSeleccionado:
        state.clientes.find((cliente) => cliente.id === id) || null,
    })),

  limpiarSeleccion: () =>
    set(() => ({
      clienteSeleccionado: null,
    })),

  setLoading: (status) =>
    set(() => ({
      isLoading: status,
      error: null,
    })),

  setError: (error) =>
    set(() => ({
      error,
      isLoading: false,
    })),
}));

export default useClienteStore;
