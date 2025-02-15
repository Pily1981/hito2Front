import React, { useContext } from "react";
import "../Componentes/stylesheets/Navbar.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavbarApp() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "NoActive");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
      <Navbar.Brand className="text-white" id="brand">
        <NavLink to="/" className="text-white nav-item">
          Babiesmarket
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <ul className="navbar-nav me-auto mb-2 ms-5 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className={setActiveClass}>
              Home
            </NavLink>
          </li>
          <li className="nav-item galery">
            <NavLink to="/products" className={setActiveClass}>
              Market
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav mb-2 ms-5 mb-lg-2">
          <div className="searcher">
            <li className="nav-item">
              <div className="search-container">
                <input
                  className="form-control search-input"
                  id="search"
                  type="search"
                  placeholder="Buscar..."
                  aria-label="Search"
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="search-icon"
                />
              </div>
            </li>
          </div>
        </ul>
        {token ? (
          <>
            <ul className="navbar-nav mb-2 ms-5 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/profile" className={setActiveClass}>
                  Profile
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 ms-5 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={setActiveClass}
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="navbar-nav mb-2 ms-5 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/Login" className={setActiveClass}>
                  Log In
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mx-5 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/Register" className={setActiveClass}>
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarApp;
