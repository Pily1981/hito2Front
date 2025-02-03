import Button from "react-bootstrap/Button";
import "../Componentes/stylesheets/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

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
          <li className="menu-item" onClick={logout}>
            Cerrar Sesión <FontAwesomeIcon icon={faChevronRight} />
          </li>
        </ul>
      </aside>
      <main className="profile-content">
        <h2>Datos Personales</h2>
        <p>Aquí se mostrarán los datos personales del usuario.</p>
        <br></br>
        <Button className="save-bt" variant="warning">
          Guardar
        </Button>
      </main>
    </div>
  );
};

export default Profile;
