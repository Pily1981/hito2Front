import React from "react";
import "../Componentes/stylesheets/myPublications.css";
import productos from "../Componentes/Productos";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MyPublications = () => {
  const navigate = useNavigate();

  const logout = () => navigate("/");
  const Profile = () => navigate("/profile");
  const myPublications = () => navigate("/myPublications");
  const createPublication = () => navigate("/upload");

  const handleDelete = (id) => {
    console.log(`Eliminar producto con ID: ${id}`);
    // Aquí iría la lógica para eliminar el producto
  };

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
            <h6>${producto.price.toLocaleString("es-CL")}</h6>
            <div className="actions">
              <NavLink to={`/edit/${producto.id}`} className="fontawesome">
                <FontAwesomeIcon icon={faPen} />|
                <span
                  className="delete-icon"
                  onClick={() => handleDelete(producto.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </NavLink>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MyPublications;
