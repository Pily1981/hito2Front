import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Componentes importados
import Navbar from "./Componentes/NavBar";
import Footer from "./Componentes/Footer";

//Pages importadas
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Productos from "./pages/Productos";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Productos" element={<Productos />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
