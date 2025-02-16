import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "../Componentes/stylesheets/editpublications.css";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBookOpen,
  faPenToSquare,
  faChevronRight,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPublication = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { publication_id } = useParams();
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(null);

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/find_user_by_id/${user.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
        console.log("data -->", data);
      } catch (error) {
        console.log("Error al obtener los datos del usuario:");
      }
    };

    fetchUser();
  }, [user.user_id, token]);

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
    <div className="container-ep">
      <div className="grid-container-ep">
        <div className="left-column">
          <div className="left-row-one">
            <div className="Welcome">
              {data ? (
                <p>Hola, {data.name}</p>
              ) : (
                <p>Cargando datos del usuario...</p>
              )}
            </div>
            <div className="image-text-container">
              <div className="icon-profile">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="text-wrapper">Editar Publicacion</div>
            </div>
          </div>

          <div className="left-row-two">
            <aside className="profile-sidebar-ep">
              <ul className="menu-list">
                <li className="menu-item" onClick={() => navigate("/profile")}>
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  Datos Personales <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li
                  className="menu-item"
                  onClick={() => navigate("/myPublications")}
                >
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faBookOpen} />
                  </div>
                  Mis publicaciones <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li className="menu-item" onClick={() => navigate("/upload")}>
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </div>
                  Crear publicación <FontAwesomeIcon icon={faChevronRight} />
                </li>
                <li
                  className="menu-item"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  <div className="icon-menu">
                    <FontAwesomeIcon icon={faPowerOff} />
                  </div>
                  Cerrar Sesión <FontAwesomeIcon icon={faChevronRight} />
                </li>
              </ul>
            </aside>
          </div>
        </div>
        <div className="center-column">
          <main className="profile-edit">
            <div className="top-row-item">
              <h3>Editar publicación</h3>
            </div>
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
              <div className="edit-btn">
                <Button className="edit-button" type="submit" variant="warning">
                  Guardar cambios
                </Button>
                <Button
                  onClick={handleButtonClick}
                  className="edit-button"
                  type="submit"
                  variant="warning"
                >
                  Volver
                </Button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EditPublication;
