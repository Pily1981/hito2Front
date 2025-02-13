import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "../Componentes/stylesheets/Product.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Formulario = () => {
  // Redirige si no hay token
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token no encontrado");
          return;
        }
        if (userId) {
          const response = await axios.get(
            `http://localhost:3000/find_user_by_id/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUserId(response.data.id);
        }
      } catch (error) {
        console.error("Error obteniendo el usuario:", error);
      }
    };

    fetchUserId();
  }, [userId]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    state: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProduct((prev) => ({ ...prev, image: file }));
    } else {
      Swal.fire({
        icon: "error",
        title: "Archivo no válido",
        text: "Por favor, selecciona una imagen válida.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name.trim() ||
      !product.description.trim() ||
      !product.price ||
      !product.category ||
      !product.state ||
      !product.image
    ) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Completa todos los campos antes de enviar.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("name", product.name);
      formData.append("price", Number(product.price));
      formData.append("category_id", mapCategoryToId(product.category));
      formData.append("description", product.description);
      formData.append("image", product.image);
      formData.append("state", product.state);

      const response = await axios.post(
        "http://localhost:3000/create_publication",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Producto subido:", response.data);
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "El producto se ha subido correctamente.",
      });

      // Resetear formulario
      setProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        state: "",
        image: null,
      });

      // Resetear input file manualmente
      document.getElementById("image").value = "";
    } catch (error) {
      console.error("Error al subir la publicación:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al subir el producto.",
      });
    }
  };

  const mapCategoryToId = (category) => {
    const categories = {
      Ropa: 1,
      Calzado: 2,
      Rodados: 3,
      Muebles: 4,
      Accesorios: 5,
    };
    return categories[category] || null;
  };

  return (
    <div className="container form-upload">
      <main className="profile-content containter-form">
        <h2>Crear publicación</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Nombre del Producto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              <option value="Ropa">Ropa</option>
              <option value="Calzado">Calzado</option>
              <option value="Rodados">Rodados</option>
              <option value="Muebles">Muebles</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="state">Estado</label>
            <select
              id="state"
              name="state"
              value={product.state}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecciona un estado
              </option>
              <option value="Usado">Usado</option>
              <option value="Buen estado">Buen estado</option>
              <option value="Como nuevo">Como nuevo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Imagen del Producto</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="upload">
            <Button className="up_bt" type="submit" variant="warning">
              Guardar
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Formulario;
