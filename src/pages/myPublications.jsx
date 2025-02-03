import React from "react";
import "../Componentes/stylesheets/myPublications.css";
import productos from "../Componentes/Productos";
import { useParams, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

const MyPublications = () => {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === id);

  return (
    <Container className="container-mp">
      <main className="publication-content-mp">
        <h2>Mis Publicaciones</h2>
        <div className="mp-inf">
          <h5>{producto.name}</h5>
          <h5> ${producto.price}</h5>
          <NavLink to="/profile" className="fontawesome">
            <span>
              {" "}
              <FontAwesomeIcon icon={faPen} />
            </span>{" "}
            |
            <span>
              {" "}
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </NavLink>
        </div>
      </main>
    </Container>
  );
};

export default MyPublications;
