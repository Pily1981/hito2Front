import React from "react";
import Header from "../Componentes/Header";
import CardProducto from "../Componentes/CardProducto";
import { Container, Row, Col } from "react-bootstrap";
import productos from "../Componentes/Productos";

const Home = () => {
  return (
    <>
      <Header />
      <h2 className="mt-5 d-flex justify-content-around">ultimos añadidos</h2>
      <Container className="mt-5 d-flex justify-content-center">
        <Row>
          {productos.map((producto) => (
            <Col
              key={producto.id}
              lg={3}
              md={6}
              xs={12}
              className="mb-5 d-flex justify-content-center"
            >
              <CardProducto producto={producto} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
export default Home;
