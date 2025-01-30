import React from "react";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import "../Componentes/stylesheets/Product.css";
import productos from "./Productos.js";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return (
      <div className="container text-center">
        <h2>Producto no encontrado</h2>
        <Button variant="primary" onClick={() => navigate("/")}>
          Volver a Inicio
        </Button>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="pd-img">
        <img src={producto.img} alt={producto.name} className="img-fluid" />
      </div>
      <div className="pd-inf">
        <h1>{producto.name}</h1>
        <p>
          Precio: <strong>${producto.price}</strong>
        </p>
        <Button variant="warning">Comprar</Button>
      </div>
      <div className="pd-desc">
        <p>{producto.desc}</p>
      </div>
      <div className="pd-comm">
        <h3>Comentarios</h3>
        <p>No hay comentarios aún.</p>
      </div>
    </div>
  );
};

export default ProductPage;
