import React, { useContext, useEffect, useState } from "react";
import "../Componentes/stylesheets/myPublications.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBookOpen,
  faPenToSquare,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
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
  const [data, setData] = useState(null);
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
  }, [token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/find_user_by_id/${user.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
        console.log("data -->", data);
      } catch (error) {
        console.log("Error al obtener los datos del usuario:");
      }
    };
    fetchUser();
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
    <div className="container-mp">
      <div className="grid-container-mp">
        <div className="left-column">
          <div className="left-row-1">
            <div className="Welcome">
              {data ? (
                <p>Hola, {data.name}</p>
              ) : (
                <p>Cargando datos del usuario...</p>
              )}
            </div>
            <div className="image-text-container">
              <div className="icon-profile">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="text-wrapper">Mis Publicaciones</div>
            </div>
          </div>

          <div className="left-row-2">
            <aside className="profile-sidebar-mp">
              <ul className="menu-list">
                <li className="menu-item" onClick={() => navigate("/profile")}>
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  Datos Personales <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li
                  className="menu-item"
                  onClick={() => navigate("/myPublications")}
                >
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faBookOpen} />
                  </div>
                  Mis publicaciones <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li className="menu-item" onClick={() => navigate("/upload")}>
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                  Crear publicación <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li
                  className="menu-item"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faPowerOff} />
                  </div>
                  Cerrar Sesión <FontAwesomeIcon icon={faChevronRight} />
                </li>
              </ul>
            </aside>
          </div>
        </div>
        <div className="center-column">
          <main className="profile-content-mp">
            <div className="top-row-item">
              <h3>Mis Publicaciones</h3>
            </div>
              {publications.map((producto) => (
                <div className="mp-inf" key={producto.publication_id}>
                  <div className="prodname">
                    <h6>{producto.title ? producto.title : "sin título"}</h6>
                  </div>
                  <div className="price">
                    <h6>${producto.price}</h6>
                  </div>
                  <div className="buttons-mp">
                    <button
                      onClick={() => handleEdit(producto.publication_id)}
                      className="edit_button"
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <span>|</span>
                    <button
                      onClick={() => handleDelete(producto.publication_id)}
                      className="delete_btn"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyPublications;
