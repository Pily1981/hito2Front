import { useContext, useEffect, useState } from "react";
import { Container, Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import perfil from "../assets/img/photo.jpg";
import { AuthContext } from "../context/AuthContext";
import "../Componentes/stylesheets/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext); // 🔹 Solución agregada

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
      await userLogin(email, password);
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

  const handleButtonClick = () => {
    navigate("/"); //Boton Volver
  };

  return (
    <Container className="container-login">
      <div className="tarjeta-login">
        <div className="photo">
          <img src={perfil} alt="Imagen perfil" />
        </div>
        <form>
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
            <label className="form-check-label5" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <div className="d-flex justify-content-center mt-3 mb-5">
            <Button type="submit" id="button" onClick={(e) => validarDatos(e)}>
              Iniciar Sesion
            </Button>
            <Button type="submit" id="button" onClick={handleButtonClick}>
              Volver
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
