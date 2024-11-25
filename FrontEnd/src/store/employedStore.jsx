import { create } from "zustand";

const useEmployedStore = create((set) => ({
  // Estado inicial
  employeds: [],
  employedSeleccionado: null,
  loggedEmployee: {},
  islogin: false,
  isLoading: false,
  error: null,

  // Implementación de acciones
  agregarEmployed: (Employed) =>
    set((state) => ({
      Employeds: [...state.Employeds, Employed],
      error: null,
    })),

  eliminarEmployed: (id) =>
    set((state) => ({
      employeds: state.Employeds.filter((Employed) => Employed.id !== id),
      employedSeleccionado:
        state.employedSeleccionado?.id === id
          ? null
          : state.employedSeleccionado,
      error: null,
    })),
  setCurrentEmployed: (id) =>
    set((state) => ({
      currentEmployed: state.employeds.find((emp) => emp.id === id) || {},
      error: null,
    })),

  actualizarEmployed: (id, EmployedActualizado) =>
    set((state) => ({
      Employeds: state.Employeds.map((Employed) =>
        Employed.id === id ? { ...Employed, ...EmployedActualizado } : Employed
      ),
      employedSeleccionado:
        state.employedSeleccionado?.id === id
          ? { ...state.employedSeleccionado, ...EmployedActualizado }
          : state.employedSeleccionado,
      error: null,
    })),

  seleccionarEmployed: (id) =>
    set((state) => ({
      employedSeleccionado:
        state.Employeds.find((Employed) => Employed.id === id) || null,
    })),

  limpiarSeleccion: () =>
    set(() => ({
      employedSeleccionado: null,
    })),
  //auth
  login: (loginData) => {
    try {
      set({ isLoading: true, error: null });

      const employeeData = loginData.json();
      console.log(employeeData);

      set({
        isLogin: true,
        loggedEmployee: employeeData,
        isLoading: false,
        error: null,
      });

      //Guardar en localStorage para persistencia
      localStorage.setItem("loggedEmployee", JSON.stringify(employeeData));
      localStorage.setItem("isLogin", "true");
    } catch (error) {
      set({
        isLogin: false,
        loggedEmployee: null,
        isLoading: false,
        error: error.message,
      });
    }
  },

  logout: () => {
    // Limpiar el estado
    set({
      isLogin: false,
      loggedEmployee: null,
      error: null,
    });

    // Limpiar localStorage
    localStorage.removeItem("loggedEmployee");
    localStorage.removeItem("isLogin");
  },

  // Verificar si hay una sesión guardada al iniciar la aplicación
  checkAuth: () => {
    const storedEmployee = localStorage.getItem("loggedEmployee");
    const storedIsLogin = localStorage.getItem("isLogin");

    if (storedEmployee && storedIsLogin === "true") {
      set({
        isLogin: true,
        loggedEmployee: JSON.parse(storedEmployee),
      });
    }
  },

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

export default useEmployedStore;
