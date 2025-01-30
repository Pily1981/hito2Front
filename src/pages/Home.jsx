import React from "react";
import Header from "../Componentes/Header";
import CardProducto from "../Componentes/CardProducto";
import { Container, Row, Col } from "react-bootstrap";
import productos from "../Componentes/Productos";

const Home = () => {
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          {productos.map((producto) => (
            <Col
              key={producto.id}
              lg={4}
              md={6}
              xs={12}
              className="mb-5 d-flex justify-content-around"
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
