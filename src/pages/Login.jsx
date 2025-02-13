import { useContext, useEffect, useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import perfil from "../assets/img/photo.jpg";
import { useUserContext } from "../context/UserContext";

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

    const validarDatos = async (e) => {
    e.preventDefault();

    if (!emailCheck(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes ingresar un email válido!",
      });
      return;
    }

    if (email.trim() === "" || password.trim() === "") {
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
        text: "Error al iniciar sesión. Verifica tus credenciales.",
      });
    }
  };

  return (
    <Container className="container-rg">
      <div className="tarjeta">
        <div className="photo">
          <img src={perfil} alt="Imagen perfil" />
        </div>
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
      </div>
    </Container>
  );
};

export default LoginPage;