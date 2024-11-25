import { create } from "zustand";
import { persist } from "zustand/middleware";
// Roles disponibles
export const ROLES = {
  CLIENTE: "cliente",
  EMPLEADO: "empleado",
  ADMINISTRADOR: "administrador",
};
import { tiposMovimiento } from "../store/movimientoStore";

const useAccountStore = create(
  persist((set, get) => ({
    // Estado inicial
    accounts: [], // Lista de todas las cuentas
    loggedAccount: null, // Cuenta actualmente logueada
    selectedAccount: null, // Cuenta seleccionada (para edición/visualización)
    isLoggedIn: false,
    isLoading: false,
    error: null,

    saveToSessionStorage: () => {
      const { loggedAccount, isLoggedIn } = get();
      sessionStorage.setItem("loggedAccount", JSON.stringify(loggedAccount));
      sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    },

    loadFromSessionStorage: () => {
      const storedAccount = sessionStorage.getItem("loggedAccount");
      const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");

      if (storedAccount && storedIsLoggedIn) {
        set({
          loggedAccount: JSON.parse(storedAccount),
          isLoggedIn: JSON.parse(storedIsLoggedIn),
        });
      }
    },
    // CRUD de cuentas
    addAccount: (accountData) =>
      set((state) => {
        const newAccount = {
          ...accountData,
          id: Date.now().toString(), // Generamos un ID único
          balance: accountData.rol === ROLES.CLIENTE ? 0 : null, // Solo clientes tienen balance
          createdAt: new Date().toISOString(),
        };

        return {
          accounts: [...state.accounts, newAccount],
          error: null,
        };
      }),

    updateAccount: (id, updatedData) =>
      set((state) => ({
        accounts: state.accounts.map((account) =>
          account.id === id
            ? {
                ...account,
                ...updatedData,
                updatedAt: new Date().toISOString(),
              }
            : account
        ),
        // Si la cuenta actualizada es la logueada, actualizamos también loggedAccount
        loggedAccount:
          state.loggedAccount?.id === id
            ? { ...state.loggedAccount, ...updatedData }
            : state.loggedAccount,
        selectedAccount:
          state.selectedAccount?.id === id
            ? { ...state.selectedAccount, ...updatedData }
            : state.selectedAccount,
        error: null,
      })),

    deleteAccount: (id) =>
      set((state) => ({
        accounts: state.accounts.filter((account) => account.id !== id),
        // Si la cuenta eliminada estaba seleccionada, la limpiamos
        selectedAccount:
          state.selectedAccount?.id === id ? null : state.selectedAccount,
        error: null,
      })),

    selectAccount: (id) =>
      set((state) => ({
        selectedAccount:
          state.accounts.find((account) => account.id === id) || null,
      })),

    clearSelectedAccount: () =>
      set(() => ({
        selectedAccount: null,
      })),

    // Funciones de balance (solo para clientes)
    updateBalance: (accountId, amount, tipoMovimiento) => {
      //verifico que sea valido el movmiento
      const validMovement = tiposMovimiento.find(
        (tm) => tm.value === tipoMovimiento
      );

      if (!validMovement) {
        return set({ error: "Tipo de movimiento inválido" });
      }
      //tomo la cuenta en base al id y cerifico que sea cliente
      const account = get().accounts.find((acc) => acc.id === accountId);

      if (!account || account.rol !== ROLES.CLIENTE) {
        return set({ error: "Solo se puede modificar el balance de clientes" });
      }
      //solo dos tipos restan al balance
      const balanceChange =
        tipoMovimiento === "Nota Debito" || tipoMovimiento === "Factura"
          ? -amount
          : amount;

      set({
        accounts: get().accounts.map((acc) =>
          acc.id === accountId
            ? {
                ...acc,
                balance: (acc.balance || 0) + balanceChange,
                updatedAt: new Date().toISOString(),
              }
            : acc
        ),
        error: null,
      });
    },

    // Autenticación
    login: (email, password, cuit) => {
      set({ isLoading: true, error: null });

      //validación de credenciales aca deberiamos implementar la llamada a la api para el login
      const account = get().accounts.find(
        (acc) =>
          acc.email === email && acc.password === password && acc.cuit == cuit
      );

      if (!account) {
        set({
          isLoading: false,
          error: "Credenciales inválidas",
        });
        return false;
      }
      if (account) {
        set({
          loggedAccount: account,
          isLoggedIn: true,
          isLoading: false,
          error: null,
        });

        // Guardar en sessionStorage
        get().saveToSessionStorage();
      }

      return true;
    },

    logout: () =>
      set(() => {
        // Limpiar sessionStorage
        sessionStorage.removeItem("loggedAccount");
        sessionStorage.removeItem("isLoggedIn");

        // Resetear estado
        return {
          loggedAccount: null,
          isLoggedIn: false,
          error: null,
        };
      }),
    // Verificar sesión guardada
    checkAuth: () => {
      const storedAccount = sessionStorage.getItem("loggedAccount");
      const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");

      if (storedAccount && storedIsLoggedIn === "true") {
        set({
          loggedAccount: JSON.parse(storedAccount),
          isLoggedIn: true,
        });
        return true;
      }
      return false;
    },

    // Utilidades
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
  }))
);

export default useAccountStore;
