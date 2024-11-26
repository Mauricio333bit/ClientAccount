import { create } from "zustand";
import { persist } from "zustand/middleware";


export const tiposMovimiento = [
  { value: "Factura", label: "Factura" },
  { value: "Recibo", label: "Recibo" },
  { value: "Nota Credito", label: "Nota Credito" },
  { value: "Nota Debito", label: "Nota Debito" },
];

const useMovimientoStore = create(
  persist(
    (set, get) => ({
      // Estado inicial
      movimientos: [],

      isLoading: false,
      error: null,

      // Método para guardar en sessionStorage
      saveToSessionStorage: () => {
        const { movimientos } = get();
        sessionStorage.setItem("movimientos", JSON.stringify(movimientos));
      },

      // Método para cargar desde sessionStorage
      loadFromSessionStorage: () => {
        const storedMovimientos = sessionStorage.getItem("movimientos");
        if (storedMovimientos) {
          set({ movimientos: JSON.parse(storedMovimientos) });
        }
      },

      //recibe el nuevo movimiento y lo añade a las listas que
      agregarMovimiento: (movimiento, updateBalanceCallback) => {
        try {
          // Validación básica
          if (!movimiento.accountId || !movimiento.amount || !movimiento.type) {
            throw new Error("Datos del movimiento incompletos.");
          }

          // Generar un ID único si no existe
          const nuevoMovimiento = {
            ...movimiento,
            id: movimiento.id || Date.now().toString(),
            createdAt: new Date().toISOString(),
          };

          // Actualizar balance usando el callback
          updateBalanceCallback(
            nuevoMovimiento.accountId,
            nuevoMovimiento.amount,
            nuevoMovimiento.type
          );

          // Agregar movimiento al estado
          set((state) => {
            const nuevosMovimientos = [...state.movimientos, nuevoMovimiento];

            // Guardar en sessionStorage
            sessionStorage.setItem(
              "movimientos",
              JSON.stringify(nuevosMovimientos)
            );

            return {
              movimientos: nuevosMovimientos,
              error: null,
            };
          });
        } catch (error) {
          set({ error: error.message });
        }
      },

      eliminarMovimiento: (id) =>
        set((state) => {
          const nuevosMovimientos = state.movimientos.filter(
            (movimiento) => movimiento.id !== id
          );

          // Guardar en sessionStorage
          sessionStorage.setItem(
            "movimientos",
            JSON.stringify(nuevosMovimientos)
          );

          return {
            movimientos: nuevosMovimientos,
            error: null,
          };
        }),

      actualizarMovimiento: (id, movimientoAct) =>
        set((state) => {
          const nuevosMovimientos = state.movimientos.map((movimiento) =>
            movimiento.id === id
              ? {
                  ...movimiento,
                  ...movimientoAct,
                  updatedAt: new Date().toISOString(),
                }
              : movimiento
          );

          // Guardar en sessionStorage
          sessionStorage.setItem(
            "movimientos",
            JSON.stringify(nuevosMovimientos)
          );

          return {
            movimientos: nuevosMovimientos,
            error: null,
          };
        }),

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
    }),
    {
      name: "movimiento-storage", // nombre único para el almacenamiento
      getStorage: () => sessionStorage, // puedes cambiar a localStorage si prefieres
    }
  )
);

export default useMovimientoStore;
