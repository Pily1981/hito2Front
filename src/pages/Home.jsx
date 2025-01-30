import React from 'react';
import Header from '../Componentes/Header';
import CardProducto from '../Componentes/CardProducto';
import { Container, Row, Col } from "react-bootstrap";
import productos from '../Componentes/Productos';


const Home = () => {
  return (
    <>
        <Header></Header>
          <Container className="mt-5">
                <Row>        
                {productos.map((producto) => (
                    <Col lg={3} md={6} sx={1} className="mb-5 d-flex justify-content-around">
                        <CardProducto key={producto.id} producto={producto} />
                    </Col>
                ))}               
                </Row>
          </Container>
    </>
  );
};


export default Home;