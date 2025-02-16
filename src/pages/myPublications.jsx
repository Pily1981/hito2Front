import React, { useContext, useEffect, useState } from "react";
import "../Componentes/stylesheets/myPublications.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyPublications = () => {
  const { user, token } = useContext(AuthContext);
  const [publications, setPublications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPublicationsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/publication_user_by_id/${user.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPublications(response.data);
      } catch (error) {
        console.error("Error al obtener las publicaciones del usuario:", error);
      }
    };
    fetchPublicationsData();
  }, [user.user_id, token]);

  // Función para eliminar una publicación
  const handleDelete = async (publication_id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta publicación?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:3000/api/delete_publication/${publication_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        alert("Publicación eliminada con éxito.");
      } catch (error) {
        console.error("Error al eliminar la publicación:", error);
        alert("Hubo un problema al eliminar la publicación.");
      }
    }
  };

  const handleEdit = (publication_id) => {
    navigate(`/editpublication/${publication_id}`);
  };

  return (
    <div className="container-pf">
      <aside className="profile-sidebar">
        <ul className="menu-list">
          <li className="menu-item" onClick={() => navigate("/profile")}>
            Datos Personales <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item" onClick={() => navigate("/myPublications")}>
            Mis publicaciones <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item" onClick={() => navigate("/upload")}>
            Crear publicación <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item" onClick={() => navigate("/")}>
            Cerrar Sesión <FontAwesomeIcon icon={faChevronRight} />
          </li>
        </ul>
      </aside>

      <main className="publication-content-mp profile-content">
        <h3>Mis Publicaciones</h3>
        {publications.map((producto) => (
          <div className="mp-inf" key={producto.publication_id}>
            <div className="prodname">
              <h6>{producto.title ? producto.title : "sin título"}</h6>
            </div>
            <div className="price">
              <h6>${producto.price}</h6>
            </div>
            <div className="action-buttons">
              <button
                onClick={() => handleEdit(producto.publication_id)}
                className="edit-btn"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
               |
              <button
                onClick={() => handleDelete(producto.publication_id)}
                className="delete-btn"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MyPublications;
