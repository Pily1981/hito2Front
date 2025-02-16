import { useState, useEffect } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import perfil from "../assets/img/photo.jpg";
import { NavLink, useNavigate } from "react-router-dom";
import "../Componentes/stylesheets/Register.css"

import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    nick_name: "",
    email: "",
    password: "",
    confPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    if (
      !formData.name ||
      !formData.lastName ||
      !formData.nick_name ||
      !formData.email ||
      !formData.password
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/create_user",
        formData
      );
      if (response.data) {
        navigate("/login");
        Swal.fire({
          icon: "success",
          title: "Registrado exitosamente",
          text: "Ahora puedes iniciar sesión.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el servidor",
        text: "Hubo un problema al procesar tu solicitud.",
      });
    }
  };

  const handleButtonClick = () => {
    navigate("/"); //Boton Volver
  };

  return (
    <Container className="container-register">
      <div className="tarjeta-register">
        <div className="photo">
          <img src={perfil} alt="Imagen perfil" />
        </div>
        <form onSubmit={handleSubmit}>
          <InputGroup size="sm" className="p-2">
            <Form.Control
              id="name"
              name="name"
              className="text-dark"
              type="text"
              placeholder=" 👤         NAME"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="p-2">
            <Form.Control
              id="lastname"
              name="lastName"
              type="text"
              className="text-dark"
              placeholder=" 👤         LAST NAME"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="p-2">
            <Form.Control
              id="email"
              name="email"
              type="email"
              className="text-dark"
              placeholder="✉         EMAIL"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="p-2">
            <Form.Control
              id="nickname"
              name="nick_name"
              type="text"
              className="text-dark"
              placeholder=" 👤         NICK NAME"
              value={formData.nick_name}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="p-2">
            <Form.Control
              id="password"
              name="password"
              type="password"
              className="text-dark"
              placeholder="🔒          PASSWORD"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup size="sm" className="p-2">
            <Form.Control
              id="confirmpassword"
              name="confPassword"
              type="password"
              className="text-dark"
              placeholder="🔒          CONFIRM PASSWORD"
              value={formData.confPassword}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <div className="d-flex justify-content-center mt-3 mb-2">
            <Button type="submit" id="button">
              Crear Cuenta
            </Button>
            <Button type="submit" id="button" onClick={handleButtonClick}>
              Volver
            </Button>
          </div>
          <NavLink
            to="/Login"
            className="text-primary text-decoration-none d-flex justify-content-center"
          >
            ¿Ya estás registrado? Iniciar Sesión
          </NavLink>
        </form>
      </div>
    </Container>
  );
};

export default Register;
