import { useContext, useEffect, useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import perfil from "../assets/img/photo.jpg";
<<<<<<< HEAD
import { useUserContext } from "../context/UserContext";
=======
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
>>>>>>> 3f9d2e74b890282f3f5d27e517385718e4d7df8d

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserContext();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext); // 🔹 Solución agregada
  const token = localStorage.getItem("token");

  const emailCheck = (email) => {
    const check = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return check.test(String(email).toLowerCase());
  };

<<<<<<< HEAD
    const validarDatos = async (e) => {
=======
  useEffect(() => {
    if (token && !user) {
      axios
        .get("http://localhost:3000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data.user))
        .catch(() => logout());
    }
  }, [token, user, setUser]); // 🔹 Agregado user y setUser como dependencias

  const login = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      setUser(data.user);

      Swal.fire({
        title: "Inicio de sesión exitoso!",
        icon: "success",
      });

      navigate("/profile");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Credenciales incorrectas",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const validarDatos = (e) => {
>>>>>>> 3f9d2e74b890282f3f5d27e517385718e4d7df8d
    e.preventDefault();

    if (!emailCheck(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes ingresar un email válido!",
      });
      return;
    }

<<<<<<< HEAD
    if (email.trim() === "" || password.trim() === "") {
=======
    if (!email.trim() || !password.trim()) {
>>>>>>> 3f9d2e74b890282f3f5d27e517385718e4d7df8d
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios!",
      });
      return;
    }

    
    try {
      await login(email, password);
      navigate("/profile");
      Swal.fire({
        title: "Inicio de sesión exitoso!",
        icon: "success",
        draggable: true,
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
<<<<<<< HEAD
        text: "Error al iniciar sesión. Verifica tus credenciales.",
=======
        text: "La contraseña debe tener al menos 6 caracteres!",
>>>>>>> 3f9d2e74b890282f3f5d27e517385718e4d7df8d
      });
    }
<<<<<<< HEAD
=======

    login();
>>>>>>> 3f9d2e74b890282f3f5d27e517385718e4d7df8d
  };

  return (
    <Container className="container-rg">
      <div className="tarjeta">
        <div className="photo">
          <img src={perfil} alt="Imagen perfil" />
        </div>
<<<<<<< HEAD
        <InputGroup size="sm" className="p-2">
          <Form.Control
            id="email"
            type="email"
            className="text-dark"
            placeholder="✉         EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup size="sm" className="p-2">
          <Form.Control
            id="password"
            type="password" 
            className="text-dark"
            placeholder="🔒          PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        <div>
          <input
            id="checkbox"
            className="form-check-input"
            type="checkbox"
            value=""
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <Button
          type="submit"
          id="button"
          className="mt-3 mb-5"
          onClick={(e) => validarDatos(e)}
        > 
          Iniciar Sesión
        </Button>
=======
        <Form onSubmit={validarDatos}>
          <InputGroup size="sm" className="p-2">
            <Form.Control
              id="email"
              type="email"
              className="text-dark"
              placeholder="✉ EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </InputGroup>
          <InputGroup size="sm" className="p-2">
            <Form.Control
              id="password"
              type="password"
              className="text-dark"
              placeholder="🔒 PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <div>
            <input id="checkbox" className="form-check-input" type="checkbox" />
            <label className="form-check-label ms-2" htmlFor="checkbox">
              Remember me
            </label>
          </div>
          <Button type="submit" id="button" className="mt-3 mb-5">
            Iniciar Sesión
          </Button>
        </Form>
>>>>>>> 3f9d2e74b890282f3f5d27e517385718e4d7df8d
      </div>
    </Container>
  );
};

export default LoginPage;