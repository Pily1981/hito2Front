import React from "react";
import "../Componentes/stylesheets/myPublications.css";
import productos from "../Componentes/Productos";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";


 const MyPublications = () => {
  return (
    <Container className="container-mp">
      <main className="publication-content-mp">
        <h2>Mis Publicaciones</h2>
        {productos.map((producto) => (
        <div className="mp-inf" key={producto.id}>         
          <h6>{producto.name}</h6>       
          <h6>${producto.price}</h6>       
        <NavLink to="/profile" className="fontawesome">
          <span>  <FontAwesomeIcon icon={faPen} /></span> |
          <span>  <FontAwesomeIcon icon={faTrash} /></span>
        </NavLink>
        </div>
      ))}
      </main>
    </Container>
  );
};

export default MyPublications;

