import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  faUser,
  faBookOpen,
  faPenToSquare,
  faPowerOff,
  faBagShopping,
  faChevronRight,
  faCommentsDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const myPublications = () => {
    navigate("/myPublications");
  };

  const createPublication = () => {
    navigate("/upload");
  };

  const MisCompras = () => {
    navigate(`/ordersPage/${user.user_id}`);
  };

  const MisVentas = () => {
    navigate(`/orderSale/${user.user_id}`);
  };

  return (
    <>
      <ul className="menu-list">
        <li className="menu-item" onClick={() => navigate("/profile")}>
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
        <li className="menu-item" onClick={createPublication}>
          <div className="icon-menu">
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          Crear publicación <FontAwesomeIcon icon={faChevronRight} />
        </li>
        <li className="menu-item-orderPage" onClick={MisCompras}>
          <div className="icon-menu-orderPage">
            <FontAwesomeIcon icon={faBagShopping} />
          </div>
          Mis Compras <FontAwesomeIcon icon={faChevronRight} />
        </li>
        <li className="menu-item-orderPage" onClick={MisVentas}>
          <div className="icon-menu-orderPage">
            <FontAwesomeIcon icon={faCommentsDollar} />
          </div>
          Mis Ventas <FontAwesomeIcon icon={faChevronRight}/>
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
    </>
  );
};

export default Sidebar;
