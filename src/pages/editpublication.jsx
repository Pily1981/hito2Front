import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "../Componentes/stylesheets/editpublications.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPublication = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { publication_id } = useParams();
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    state: "",
    image: "",
  });

  // Verifica si el token existe
  useEffect(() => {
    if (!token) {
      navigate("/myPublications");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get_categories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, [token]);

  // Obtener los datos de la publicación cuando el componente se monta
  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/find_publication_by_id/${publication_id}`,
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

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que todos los campos estén completos
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

    // Si todos los campos están completos, puedes enviar los datos a la API
    try {
      const payload = {
        user_id: user.user_id,
        title: product.name,
        price: Number(product.price),
        category_id: product.category,
        description: product.description,
        image: product.image,
        state: product.state,
      };

      const response = await axios.put(
        `http://localhost:3000/api/update_publication/${publication_id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "La publicación se ha actualizado correctamente.",
      });

      // Redirige a la lista de publicaciones/
      navigate("/myPublications");
    } catch (error) {
      console.error("Error al actualizar la publicación:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar la publicación.",
      });
    }
  };

  const handleButtonClick = () => {
    navigate("/myPublications"); //Boton Volver
  };

  return (
    <div className="container form-upload">
      <main className="profile-content containter-form">
        <h2>Editar publicación</h2>
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
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.name_category}
                </option>
              ))}
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
              <option value="Nuevo">Nuevo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="image">Imagen del Producto</label>
            <input
              type="text"
              id="image"
              name="image"
              value={product.image}
              onChange={handleChange}
              required
            />
          </div>
          <div className="upload">
            <Button className="up_bt" type="submit" variant="warning">
              Guardar cambios
            </Button>
            <Button
              onClick={handleButtonClick}
              className="up_bt"
              type="submit"
              variant="warning"
            >
              Volver
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditPublication;
