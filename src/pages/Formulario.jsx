import Button from "react-bootstrap/Button";
import "../Componentes/stylesheets/Product.css";
import { useState } from "react";

const Formulario = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
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
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto subido:", product);
  };

  return (
    <div className="container">
      <main className="profile-content">
        <h2>Subir Producto</h2>
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
          <Button className="save-bt" type="submit" variant="warning">
            Guardar
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Formulario;
