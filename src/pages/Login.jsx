import { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import perfil from "../assets/img/photo.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const emailCheck = (email) => {
    const check = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return check.test(String(email).toLowerCase());
  };

  // Validaciones:
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
    console.log("lala", email);
    if (email.trim() === "" || password.trim() === "") {
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
        text: "La contraseña debe tener al menos 6 carácteres!",
      });
      return;
    }

    navigate("/profile");

    Swal.fire({
      title: "Inicio de sesión exitoso!",
      icon: "success",
      draggable: true,
    });

    setEmail("");
    setPassword("");
    return;
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
            type="text"
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
          <NavLink to="/profile" className="text-decoration-none text-white">
             Iniciar Sesión
          </NavLink>
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
