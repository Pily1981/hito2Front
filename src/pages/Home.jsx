import React, { useEffect, useState } from "react";
import Header from "../Componentes/Header";
import CardProducto from "../Componentes/CardProducto";
import { Container, Row, Col } from "react-bootstrap";
import "../Componentes/stylesheets/Home.css";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllPublicationsData = async () => {
      try {
        const response = await axios.get(
          `https://proyecto-final-backend-1u96.onrender.com/api/publication_all`
        );
        setProducts(response.data.slice(0, 3)); // Usamos slice para obtener solo los primeros tres productos
      } catch (error) {
        console.error("Error al obtener las publicaciones del usuario:", error);
      }
    };
    fetchAllPublicationsData();
  }, []);

  return (
    <>
      <Header />
      <h2 className="mt-5 text-center">Últimos añadidos</h2>
      <Container className="d-flex flex-column align-items-center">
        <Row className="mt-5">
          {products.map((product) => (
            <Col
              key={product.publication_id}
              lg={4}
              md={6}
              xs={12}
              className="mb-5 mt-1 g-5 d-flex justify-content-around"
            >
              <CardProducto product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;
