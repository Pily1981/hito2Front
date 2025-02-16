import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "../Componentes/stylesheets/Product.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBookOpen,
  faPenToSquare,
  faChevronRight,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

const Formulario = () => {
  // Redirige si no hay token
  const navigate = useNavigate();
  const { user, token, logout } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
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

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: null,
    state: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(product.name);
    console.log(product.description);
    console.log(product.price);
    console.log(product.category);
    console.log(product.state);

    console.log(product.image);
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
      const payload = {
        user_id: user.user_id,
        title: product.name,
        price: Number(product.price),
        category_id: product.category,
        description: product.description,
        image: product.image,
        state: product.state,
      };

      const response = await axios.post(
        "http://localhost:3000/api/create_publication",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
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
              <div className="text-wrapper">Crear Publicacion</div>
            </div>
          </div>

          <div className="left-row-2">
            <aside className="profile-sidebar">
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
          <main className="profile-upload">
            <div className="top-row-item">
              <h3>Crear publicación</h3>
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre del producto</label>
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
                  <label htmlFor="image">Imagen del producto</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="upload">
                  <Button
                    className="upload_btn"
                    type="submit"
                    variant="warning"
                  >
                    Guardar
                  </Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
