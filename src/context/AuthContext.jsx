import { createContext, useState } from "react";
import Swal from "sweetalert2";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  const logout = () => {
    setToken(null);
    setUser({});
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
  };

  const userLogin = async (email, password) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };

      const resp = await fetch("", options); // endpoint de backend para inicio de sesión
      if (resp.status != 200) {
        Swal.fire({
          title: "Error!",
          text: "El usuario no existe",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        throw new Error("error al hacer el login");
        return;
      }
      const data = await resp.json();
      setToken(data.token);
      localStorage.setItem("authToken", data.token); // revisar cuando se conecte el back
      localStorage.setItem("userEmail", email); // revisar cuando se conecte el back
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async (email, password, confirmPassword) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // faltan parametros del formulario register
          email,
          password,
          confirmPassword,
        }),
      };

      const resp = await fetch("", options); //falta endpoint del registro de usuario
      if (resp.status != 200) {
        Swal.fire({
          title: "Error!",
          text: "Error al crear usuario",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        throw new Error("error al hacer el login");
        return;
      }
      const data = await resp.json();
      console.log("register -->", data);

      setToken(data.token);
      localStorage.setItem("authToken", data.token); //revisar cuando se conecte el back
      localStorage.setItem("userEmail", email); //revisar cuando se conecte el back
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
        userLogin,
        user,
        setUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
