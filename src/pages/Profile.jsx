import Button from "react-bootstrap/Button";
import "../Componentes/stylesheets/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  return (
    <div className="container-pf">
      <aside className="profile-sidebar">
        <ul className="menu-list">
          <li className="menu-item">
            Datos Personales <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item">
            Mis publicaciones <FontAwesomeIcon icon={faChevronRight} />
          </li>
          <li className="menu-item">
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
