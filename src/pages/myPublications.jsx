import React from "react";
import "../Componentes/stylesheets/myPublications.css";
import productos from "../Componentes/Productos";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";

<<<<<<< HEAD
=======
const MyPublications = () => {
  const { id } = useParams();
  const producto = productos.find((p) => p.id === id);
>>>>>>> cd2ffa4629c08732b3c1e8e945efd33b66398560

 const MyPublications = () => {
  return (
    <Container className="container-mp">
      <main className="publication-content-mp">
        <h2>Mis Publicaciones</h2>
<<<<<<< HEAD
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
=======
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
>>>>>>> cd2ffa4629c08732b3c1e8e945efd33b66398560
      </main>
    </Container>
  );
};

export default MyPublications;

