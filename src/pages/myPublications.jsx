import React, { useContext, useEffect, useState } from "react";
import "../Componentes/stylesheets/myPublications.css";
import productos from "../Componentes/Productos";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyPublications = () => {
    const { user, token } = useContext(AuthContext);
  const [publications, setPublications] = useState([])
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
    }
    fetchPublicationsData();
  }, [])
  

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  const profile = () => {
    navigate("/profile");
  };

  const myPublications = () => {
    navigate("/myPublications");
  };

  const createPublication = () => {
    navigate("/upload");
  };
console.log(publications);

  return (
    <div className="container-pf">
      <aside className="profile-sidebar">
        <ul className="menu-list">
          <li className="menu-item" onClick={profile}>
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
        { publications.map((producto) => (
          <div className="mp-inf" key={producto.id}>
            <div className="prodname">
              <h6>{producto.title ? producto.title: "sin titulo"}</h6>
            </div>
            <div className="price">
              <h6>${producto.price}</h6>
            </div>
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
        ))}
      </main>
    </div>
  );
};

export default MyPublications;
