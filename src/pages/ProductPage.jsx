import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Componentes/stylesheets/Product.css";
import { AuthContext } from "../context/AuthContext";

const ProductPage = () => {
  const { id } = useParams();
    const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000"

  useEffect(() => {
    if (!id) return;
    axios
      .get(
        `${urlBase}/api/find_publication_by_id/${id}`
      )
      .then((response) => setProducto(response.data))
      .catch((error) =>
        console.error("Error al cargar la publicación:", error)
      );
  }, [id]);

  // 🚀 Obtener comentarios del backend al cargar la página
  useEffect(() => {
    axios
      .get(
        `${urlBase}/api/find_comment_by_publication_id/${id}`
      )
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
        },  {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Agregar el nuevo comentario a la lista sin recargar
      setComentarios([response.data, ...comentarios]);
      setNuevoComentario("");
    } catch (error) {
      console.error("Error al enviar comentario", error);
    }
  };

  // 🗑 Eliminar comentario corregir ruta
  const handleEliminarComentario = async (comment_id) => {
    try {
      await axios.delete(
        `${urlBase}/api/delete_comment/${id}`
      );
      setComentarios(
        comentarios.filter((comentario) => comentario.comment_id !== comment_id)
      );
    } catch (error) {
      console.error("Error al eliminar comentario", error);
    }
  };

  if (!producto) {
    return (
      <div className="container text-center">
        <h2>Producto no encontrado</h2>
        <Button variant="primary" onClick={() => navigate("/")}>
          Volver a Inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="pd-img">
        <img src={producto.image} alt={producto.title} className="img-fluid" />
      </div>
      <div className="pd-inf">
        <h1>{producto.title}</h1>
        <p>
          Precio: <strong>${producto.price}</strong>
        </p>
        <Button variant="warning"  onClick={() => navigate(`/orderdetail/${producto.publication_id}`)}>Comprar</Button>
      </div>
      <div className="pd-desc">
        <p>{producto.description}</p>
      </div>

      {/* 📝 Sección de Comentarios */}
      <div className="pd-comm">
        <h3>Comentarios</h3>
        {comentarios.length > 0 ? (
          comentarios.map((comentario) => (
            <div key={comentario.comment_id} className="comentario">
              <p>
                <strong>Usuario {comentario.user_id}:</strong>{" "}
                {comentario.comment}
              </p>
              <Button
                variant="danger"
                size="sm"
                className="mb-2"
                onClick={() => handleEliminarComentario(comentario.comment_id)}
              >
                Eliminar
              </Button>
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
          <Button variant="primary" type="submit" className="mt-2">
            Enviar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
