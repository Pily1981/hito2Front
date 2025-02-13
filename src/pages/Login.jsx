import { useContext, useEffect, useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import perfil from "../assets/img/photo.jpg";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext); // 🔹 Solución agregada
  const token = localStorage.getItem("token");

  const emailCheck = (email) => {
    const check = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return check.test(String(email).toLowerCase());
  };

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
    e.preventDefault();

    if (!emailCheck(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes ingresar un email válido!",
      });
      return;
    }

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios!",
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La contraseña debe tener al menos 6 caracteres!",
      });
      return;
    }

    login();
  };

  return (
    <Container className="container-rg">
      <div className="tarjeta">
        <div className="photo">
          <img src={perfil} alt="Imagen perfil" />
        </div>
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
      </div>
    </Container>
  );
};

export default LoginPage;
