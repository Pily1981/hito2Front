import React, { useState } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import perfil from "../assets/img/photo.jpg";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [NickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

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

    if (email === "" || password === "" || confPassword === "") {
      alert("Todos los campos son obligatorios");
      return false;
    }

    if (password.length < 6) {
      alert("El password debe tener al menos 6 caracteres");
      return false;
    }
    if (password !== confPassword) {
      alert("El password y la confirmación del password deben ser iguales");
      return false;
    }
    alert("Formulario enviado con éxito!");
    setName("");
    setLastName("");
    setEmail("");
    setNickName("");
    setPassword("");
    setConfPassword("");
    return true;
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="d-flex flex-column justify-content-center align-items-center bg-light rounded-2 gap-2 mt-2 mb-2 pt-3 pb-3"
          style={{ width: "500px" }}
        >
          <div className="photo">
            <img src={perfil} alt="Imagen perfil" />
          </div>
          <InputGroup className="p-2">
            <Form.Control
              id="name"
              className="text-dark"
              type="text"
              placeholder=" 👤         NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="p-2">
            <Form.Control
              id="lastname"
              type="text"
              className="text-dark"
              placeholder=" 👤         LAST NAME"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="p-2">
            <Form.Control
              id="email1"
              type="email"
              className="text-dark"
              placeholder="✉         EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="p-2">
            <Form.Control
              id="nickname"
              type="text"
              className="text-dark"
              placeholder=" 👤         NICK NAME"
              value={NickName}
              onChange={(e) => setNickName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="p-2">
            <Form.Control
              id="password1"
              type="text"
              className="text-dark"
              placeholder="🔒          PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup className="p-2">
            <Form.Control
              id="confirmpassword"
              type="text"
              className="text-dark"
              placeholder="🔒          CONFIRM PASSWORD"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              required
            />
          </InputGroup>
          <Button type="submit" id="button" onClick={(e) => validarDatos(e)}>
            Crear Cuenta
          </Button>
          <NavLink to="/Login" className="text-primary text-decoration-none">
            ¿Ya estás registrado? Iniciar Sesión
          </NavLink>
        </div>
      </div>
    </Container>
  );
};

export default Register;
