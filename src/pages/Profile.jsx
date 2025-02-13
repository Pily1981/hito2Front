import Button from "react-bootstrap/Button";
import "../Componentes/stylesheets/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, token } = useContext(AuthContext);
  const [data, setData] = useState(null);

  // Redirige si no hay token
   useEffect(() => {
     if (!token) {
       navigate("/");
     }
   }, [token, navigate]);

  // Obtiene datos del usuario
  useEffect(() => {
    const fetchProfileData = async () => {
      console.log("aNTES");
      
      if (!token || !user.user_id) return;
      console.log("despues");
      
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
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchProfileData();
  }, [token, user]); // 👈 Aquí está el arreglo de dependencias

  const myPublications = () => {
    navigate("/myPublications");
  };

  const createPublication = () => {
    navigate("/upload");
  };

  return (
    <div className="container-pf">
      <aside className="profile-sidebar">
        <ul className="menu-list">
          <li className="menu-item">
            Datos Personales <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item" onClick={myPublications}>
            Mis publicaciones <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item" onClick={createPublication}>
            Crear publicación <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li
            className="menu-item"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Cerrar Sesión <FontAwesomeIcon icon={faChevronRight} />
          </li>
        </ul>
      </aside>
      <main className="profile-content">
        <h2>Datos Personales</h2>
        {data ? (
          <p>
            Nombre: {data.name} {data.last_name}
          </p>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
        <br />
        {data ? (
          <p>Email: {data.email}</p>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
        <br />
        {data ? (
          <p>Usuario: {data.nick_name}</p>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
        <br />
        <Button className="save-bt" variant="warning">
          Guardar
        </Button>
      </main>
    </div>
  );
};

export default Profile;
