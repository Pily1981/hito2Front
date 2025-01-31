import React from "react";
import CardProducto from "../Componentes/CardProducto";
import { Container, Row, Col } from "react-bootstrap";
import productos from "../Componentes/Productos";

const Productos = () => {
  return (
    <Container className="mt-5 d-flex flex-column align-items-center">
      <Row className="mt-5">
        {productos.map((producto) => (
          <Col
            key={producto.id}
            lg={3}
            md={6}
            xs={12}
            className="mb-5 d-flex justify-content-around"
          >
            <CardProducto producto={producto} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Productos;
