import React, { useEffect, useState } from "react";
import CardProducto from "../Componentes/CardProducto";
import { Container, Row, Col } from "react-bootstrap";
import "../Componentes/stylesheets/Home.css";
import axios from "axios";

const Productos = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchAllPublicationsData = async () => {
      try {
        const response = await axios.get(
          `https://proyecto-final-backend-1u96.onrender.com/api/publication_all`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener las publicaciones del usuario:", error);
      }
    };
    fetchAllPublicationsData();
  }, []);

  return (
    <Container className="mt-5 d-flex flex-column align-items-center ">
      <Row className="mt-5">
        {products.map((product) => (
          <Col
            key={product.publication_id}
            lg={4}
            md={6}
            xs={12}
            className="mb-5 g-5 mt-1 d-flex justify-content-around"
          >
            <CardProducto product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Productos;
