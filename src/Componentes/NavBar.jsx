import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavbarApp() {
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "NoActive");

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" sticky="top">
      <Navbar.Brand className="text-white" id="brand">
        BabiesMarket
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <ul className="navbar-nav me-auto mb-2 ms-5 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className={setActiveClass}>
              Home
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav mb-2 ms-5 mb-lg-2">
          <li className="nav-item">
            <input
              className="form-control"
              id="search"
              type="search"
              placeholder="🔎"
              aria-label="Search"
            />
          </li>
        </ul>
        <ul className="navbar-nav mb-2 ms-5 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/Login" className={setActiveClass}>
              Inicio Sesión
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav mb-2 mx-5 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/Register" className={setActiveClass}>
              Register
            </NavLink>
          </li>
        </ul>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarApp;
