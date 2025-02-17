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
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    state: "",
    image: "",
  });


  useEffect(() => {
    if (!token) {
      navigate("/myPublications");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000"
        const response = await axios.get(
          `${urlBase}/api/find_publication_by_id/${publication_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProduct({
          name: response.data.title,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category_id,
          state: response.data.state ? "Nuevo" : "Usado",
          image: response.data.image,
        });
      } catch (error) {
        console.error("Error al obtener la publicación:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al obtener la publicación.",
        });
      }
    };

    fetchPublication();
  }, [publication_id, token]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000"
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
      <div className="grid-container">
        <div className="grid-item top-column">
          <div className="Order-detail-superior">
            <div className="Saludo">
              {data ? (
                <p>Gracias, {data.name}!</p>
              ) : (
                <p>Cargando datos del usuario...</p>
              )}
            </div>
            <div className="Grip_Orden">
              <div className="Imagen_order">
                <img
                  src={Order}
                  alt="Imagen de venta"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
              <div className="Detalle_Order">
                <h5>Detalle de tu pedido</h5>
                <h6>Producto: {product.name}</h6>
                <h6>Descripción: {product.description}</h6>
                <h6>Precio: ${product.price}</h6>
                <h6>Estado: {product.state}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-item bottom-column">
        <div className="Order-detail-inf">
          <div className="Mensaje">
            <h6>Tu Orden de Compra está siendo procesada!</h6>
            <h6>En breve nos contactaremos contigo</h6>
          </div>
          <div className="back_btn">
            <Button
              variant="primary"
              className="order_btn"
              onClick={() => navigate("/")} 
            >
              Volver al Inicio
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
