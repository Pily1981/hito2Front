import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

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
      <Card.Body className="Cardproducto">
        <Card.Title className="text-center">
          <strong>{producto.name}</strong>
        </Card.Title>
        <Card.Text className="text-center">Precio: ${producto.price}</Card.Text>
      </Card.Body>
      <Button
        type="button"
        className="w-100 d-flex justify-content-center align-items-center"
        id="buttonCompras"
      >
        Comprar
      </Button>
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
