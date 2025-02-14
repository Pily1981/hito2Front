import axios from "axios";
import { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al parsear usuario de localStorage:", error);
        logout();
      }
    }
  }, []);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  const userLogin = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return true;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error en el servidor";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
      console.error("Error en login:", error);
      return false;
    }
  };

  //const registerUser = async (email, password, confirmPassword) => {
  //  try {
  //    const { data } = await axios.post("http://localhost:3000/api/create_user", {
  //      email,
  //      password,
  //      confirmPassword,
  //    });

  //    setToken(data.token);
  //    setUser(data.user);
  //    localStorage.setItem("authToken", data.token);
  //    localStorage.setItem("user", JSON.stringify(data.user));

  //    return true;
  //  } catch (error) {
  //    const errorMessage =
  //      error.response?.data?.message || "Error en el servidor";
  //    Swal.fire({
  //      title: "Error!",
  //      text: errorMessage,
  //      icon: "error",
  //      confirmButtonText: "Cerrar",
  //    });
  //    console.error("Error en registro:", error);
  //    return false;
  //  }
  //};

  return (
    <AuthContext.Provider
      value={{ token, user, logout, userLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
