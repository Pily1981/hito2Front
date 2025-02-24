import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Componentes/stylesheets/Product.css";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

const ProductPage = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [userData, setUserData] = useState(null); 
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (!id) return;
    axios
      .get(`${urlBase}/api/find_publication_by_id/${id}`)
      .then((response) => setProducto(response.data))
      .catch((error) =>
        console.error("Error al cargar la publicación:", error)
      );
  }, [id]);

  // Cargar los datos del usuario logueado
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${urlBase}/api/find_user_by_id/${user.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data); // Guardamos los datos del usuario
        console.log("Datos del usuario logueado:", response.data); // Verificación de los datos del usuario
      } catch (error) {
        console.log("Error al obtener los datos del usuario:");
      }
    };

    fetchUser();
  }, [user.user_id, token]);

  // 🚀 Obtener comentarios del backend al cargar la página
  useEffect(() => {
    axios
      .get(`${urlBase}/api/find_comment_by_publication_id/${id}`)
      .then((response) => setComentarios(response.data))
      .catch((error) => console.error("Error al cargar comentarios", error));
  }, [id]);

  // ✍️ Enviar un nuevo comentario
  const handleComentarioSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoComentario.trim()) return;

    try {
      const response = await axios.post(
        `${urlBase}/api/create_comment`,
        {
          publication_id: id,
          user_id: user.user_id,
          comment: nuevoComentario,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const comment = { ...response.data };
      comment.name = user.name;
      const data = [comment, ...comentarios].sort(
        (a, b) => b.comment_id - a.comment_id
      );
      // Agregar el nuevo comentario a la lista sin recargar
      setComentarios(data);
      setNuevoComentario("");
    } catch (error) {
      console.error("Error al enviar comentario", error);
    }
  };

  // 🗑 Eliminar comentario corregir ruta
  const handleEliminarComentario = async (comment_id) => {
    try {
      await axios.delete(`${urlBase}/api/delete_comment/${comment_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComentarios(
        comentarios.filter((comentario) => comentario.comment_id !== comment_id)
      );
    } catch (error) {
      console.error("Error al eliminar comentario", error);
    }
  };

  //Gestion de la compra
  const handleComprar = async () => {
    if (producto && String(producto.user_id) === String(userData.user_id)) { 
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No puedes comprar tu propia publicación.",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/products");
      });
      return;
    }
  
    try {
      // Verificar si el producto ya fue vendido
      const checkResponse = await axios.get(
        `${urlBase}/api/find_order_detail_by_publication_id/${producto.publication_id}`
      );
  
      if (checkResponse.data.sold) {
        Swal.fire({
          icon: "error",
          title: "Producto No Disponible",
          text: "Este producto ya ha sido vendido.",
        }).then(() => {
          navigate("/products");
        });
        return; // Detener la ejecución si el producto ya fue vendido
      }
  
      // Crear la orden si el producto sigue disponible
      const orderResponse = await axios.post(
        `${urlBase}/api/create_order`,
        {
          user_id: user.user_id,
          state: true,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const orderId = orderResponse.data.order_id; 
  
      // Crear el detalle de la orden
      await axios.post(
        `${urlBase}/api/create_order_detail`,
        {
          order_id: orderId,
          publication_id: producto.publication_id,
          price: producto.price,
          quantity: 1, // La cantidad de productos que se compran
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      Swal.fire({
        icon: "success",
        title: "Compra Exitosa",
        text: "Tu orden ha sido creada correctamente.",
      }).then(() => {
        navigate(`/orderdetail/${producto.publication_id}`);
      });
      
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema al realizar la compra. Intenta nuevamente.",
      });
    }
  };
  
  if (!producto) {
    return (
      <div className="container text-center">
        <h2>Producto no encontrado</h2>
        <Button variant="primary" onClick={() => navigate("/")}>
          Volver al Inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="container-product">
      <div className="pd-img">
        <img src={producto.image} alt={producto.title} className="img-fluid" />
      </div>
      <div className="pd-inf">
        <h1>{producto.title}</h1>
        <p>
          Precio: <strong>${producto.price}</strong>
        </p>
        <Button
          variant="warning"
          onClick={handleComprar}
        >
          Comprar
        </Button>
      </div>
      <div className="pd-desc">
        <p>{producto.description}</p>
      </div>

      {/* 📝 Sección de Comentarios */}
      <div className="pd-comm">
        <h3>Comentarios</h3>
        {comentarios.length > 0 ? (
          comentarios.map((comentario) => (
            <div
              key={comentario.comment_id}
              className="comentario d-flex justify-content-between"
            >
              <p>
                <strong>{comentario.name}:</strong> {comentario.comment}
              </p>
              {user?.user_id == comentario.user_id ? (
                <Button
                  variant="danger"
                  size="sm"
                  className="mb-2"
                  onClick={() =>
                    handleEliminarComentario(comentario.comment_id)
                  }
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              ) : null}
            </div>
          ))
        ) : (
          <p className="comments">No hay comentarios aún.</p>
        )}

        {/* 📌 Formulario para enviar comentario */}

        <form onSubmit={handleComentarioSubmit}>
          <textarea
            className="form-control"
            rows="3"
            placeholder="Escribe tu comentario..."
            value={nuevoComentario}
            onChange={(e) => setNuevoComentario(e.target.value)}
          />
          {user ? (
            <Button variant="dark" type="submit" className="mt-2">
              Enviar
            </Button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
