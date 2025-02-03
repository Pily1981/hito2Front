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
    <div className="container-pf">
      <aside className="profile-sidebar">
        <ul className="menu-list">
          <li className="menu-item" onClick={Profile}>
            Datos Personales <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item" onClick={myPublications}>
            Mis publicaciones <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item" onClick={createPublication}>
            Crear publicación <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item" onClick={logout}>
            Cerrar Sesión <FontAwesomeIcon icon={faChevronRight} />
          </li>
        </ul>
      </aside>
      <main className="publication-content-mp profile-content">
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
    </div>
  );
};

export default MyPublications;
