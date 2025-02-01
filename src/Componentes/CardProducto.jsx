import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function CardProducto({ producto }) {
  return (
    <Card className="border border-dark">
      <Card.Img
        className="p-3"
        variant="top"
        src={producto.img}
        alt={producto.name}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body className="Cardproducto d-flex flex-column align-items-center">
        <Card.Title className="text-center">
          <strong>{producto.name}</strong>
        </Card.Title>
        <Card.Text className="text-center">Precio: ${producto.price}</Card.Text>
        <NavLink to={`/product/${producto.id}`}>
          <Button type="button" className="w-90 mt-2" id="buttonCompras">
            Comprar
          </Button>
        </NavLink>
      </Card.Body>
    </Card>
  );
}

CardProducto.propTypes = {
  producto: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardProducto;
