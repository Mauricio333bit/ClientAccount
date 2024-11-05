import { create } from "zustand";

const useMovimientoStore = create((set, get) => ({
  // Estado inicial
  movimientos: [],

  isLoading: false,
  error: null,
  //recibe el nuevo movimiento y lo añade a las listas que
  agregarMovimiento: (movimiento) =>
    set((state) => ({
      movimientos: [...state.movimientos, movimiento],
      error: null,
    })),
  eliminarMovimiento: (id) =>
    set((state) => ({
      movimientos: state.movimientos.filter(
        (movimiento) => movimiento.id !== id
      ),

      error: null,
    })),
  actualizarMovimiento: (id, movimientoAct) =>
    set((state) => ({
      movimientos: state.movimientos.map((movimiento) =>
        movimiento.id === id ? { ...movimiento, ...movimientoAct } : movimiento
      ),
      clienteSeleccionado:
        state.clienteSeleccionado?.id === id
          ? { ...state.clienteSeleccionado, ...movimientoAct }
          : state.clienteSeleccionado,
      error: null,
    })),
  obtenerFacturas: () => {
    const state = get();
    return state.movimientos.filter(
      (movimiento) => movimiento.tipo === "Factura"
    );
  },

  // Método para obtener facturas por estado (si lo necesitas)
  obtenerFacturasPorEstado: (estado) => {
    const state = get();
    return state.movimientos.filter(
      (movimiento) =>
        movimiento.tipo === "Factura" && movimiento.estado === estado
    );
  },
}));

export default useMovimientoStore;
