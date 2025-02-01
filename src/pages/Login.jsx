import { useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import perfil from "../assets/img/photo.jpg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailCheck = (email) => {
    const check = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return check.test(String(email).toLowerCase());
  };

  // Validaciones:
  const validarDatos = (e) => {
    e.preventDefault();

    if (!emailCheck(email)) {
      alert("Ingrese un email válido");
      return false;
    }
    if (email === "" || password === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    alert("Inicio de sesion exitoso!");
    setEmail("");
    setPassword("");
    return true;
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
          Iniciar Sesión
        </Button>
      </div>
    </Container>
  );
};

export default LoginPage;
