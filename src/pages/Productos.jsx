import React from 'react';
import CardProducto from '../Componentes/CardProducto';
import { Container, Row, Col } from "react-bootstrap";
import productos from '../Componentes/Productos';


const Productos= () => {
  return (
    <>
      <Container class="mt-5" >
        <Row className='mt-5'>        
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


export default Productos;