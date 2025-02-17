import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "../Componentes/stylesheets/orderdetail.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Order from "../assets/img/Order.jpg";

const OrderDetail = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { publication_id } = useParams();
  const [data, setData] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/myPublications");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const response = await axios.get(
          `${urlBase}/api/find_publication_by_id/${publication_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener la publicación:", error);
      }
    };

    fetchPublication();
  }, [publication_id, token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const response = await axios.get(
          `${urlBase}/api/find_user_by_id/${user.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (error) {
        console.log("Error al obtener los datos del usuario:");
      }
    };

    fetchUser();
  }, [user.user_id, token]);

  return (
    <div className="container-od">
      <div className="Saludo-OrderDetail">
        {data ? (
          <p>Gracias, {data.name}!</p>
        ) : (
          <p>Cargando datos del usuario...</p>
        )}
      </div>
      <section className="order-detail-section">
        <div className="row">
          <div className="col-md-6">
            <div className="order-detail-left">
              <h5>Detalle de tu pedido</h5>
              <ul className="order-details">
                <li className="menu-item-order">
                  Producto: {product ? product.title : "Cargando..."}
                </li>
                <li className="menu-item-order">
                  Descripción: {product ? product.description : "Cargando..."}
                </li>
                <li className="menu-item-order">
                  Precio: {product ? `$${product.price}` : "Cargando..."}
                </li>
                <li className="menu-item-order">
                  Estado: {product ? product.state : "Cargando..."}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="order-detail-right">
              <img
                src={Order}
                alt="Imagen de venta"
                className="order-image"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="message-section">
        <div className="message-container">
          <h6>Tu Orden de Compra está siendo procesada!</h6>
          <h6>En breve nos contactaremos contigo</h6>
        </div>
        <div className="button-container">
          <Button
            variant="warning"
            className="order-btn"
            onClick={() => navigate("/")}
          >
            Volver al Inicio
          </Button>
        </div>
      </section>
    </div>
  );
};

export default OrderDetail;
