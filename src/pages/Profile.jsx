import Button from "react-bootstrap/Button";
import "../Componentes/stylesheets/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faBookOpen,
  faPenToSquare,
  faPowerOff,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
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

      if (!token || !user.user_id) return;

      try {
        const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const response = await axios.get(
          `${urlBase}/api/find_user_by_id/${user?.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (error) {
        navigate("/login")
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

//Boton que dirige a Mis Compras
  const MisCompras = () => {
    navigate("/ordersPage/:user_id");
  };

  return (
    <div className="container-profile">
      <div className="grid-container-profile">
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
              <div className="text-wrapper">Mi Perfil</div>
            </div>
          </div>

          <div className="left-row-2-pf">
            <aside className="profile-sidebar">
              <ul className="menu-list">
                <li className="menu-item">
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  Datos Personales <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li className="menu-item" onClick={myPublications}>
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faBookOpen} />
                  </div>
                  Mis publicaciones <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li className="menu-item" onClick={MisCompras}>
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faBagShopping} />
                  </div>
                  Mis Compras <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li className="menu-item" onClick={createPublication}>
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
                  Cerrar sesión <FontAwesomeIcon icon={faChevronRight} />
                </li>
              </ul>
            </aside>
          </div>
        </div>

        <div className="center-column-profile">
          <main className="profile-content">
            <div className="top-row-item">
              <h3>Datos Personales</h3>
            </div>
            <div className="middle-row">
              <div className="middle-left item">
                {data ? (
                  <p>
                    Nombre:
                    <span className="data">{data.name}</span>
                  </p>
                ) : (
                  <p>Cargando datos del usuario...</p>
                )}
              </div>
              <div className="middle-right item">
                {data ? (
                  <p>
                    Apellido:
                    <span className="data">{data.last_name}</span>
                  </p>
                ) : (
                  <p>Cargando datos del usuario...</p>
                )}
              </div>
              <div className="middle-left item">
                {data ? (
                  <p>
                    Email:
                    <span className="data">{data.email}</span>
                  </p>
                ) : (
                  <p>Cargando datos del usuario...</p>
                )}
              </div>
              <div className="middle-right item">
                {data ? (
                  <p>
                    Nickname:
                    <span className="data">{data.nick_name}</span>
                  </p>
                ) : (
                  <p>Cargando datos del usuario...</p>
                )}
              </div>
            </div>
            <div className="boton-row item">
              {/*<Button className="save-bt" type="button" variant="warning">
                Guardar
              </Button>*/}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
