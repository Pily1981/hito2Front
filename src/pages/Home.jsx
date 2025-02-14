import React, { useEffect, useState } from "react";
import Header from "../Componentes/Header";
import CardProducto from "../Componentes/CardProducto";
import { Container, Row, Col } from "react-bootstrap";
import productos from "../Componentes/Productos";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchAllPublicationsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/publication_all`
        );
        setProducts(response.data.splice(0, 3));
      } catch (error) {
        console.error("Error al obtener las publicaciones del usuario:", error);
      }
    };
    fetchAllPublicationsData();
  }, []);
  return (
    <>
      <Header />
      <h2 className="mt-5 d-flex justify-content-around">Últimos añadidos</h2>
      <Container className="mt-5 d-flex justify-content-center">
        <Row>
          {products.map((product) => (
            <Col
              key={product.publication_id}
              lg={3}
              md={6}
              xs={12}
              className="mb-5 d-flex justify-content-center"
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
