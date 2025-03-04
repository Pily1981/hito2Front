import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

//realizar un useEffect donde traiga la id del producto
function CardProducto({ product }) {
  return (
    <Card className="border border-dark shadow-sm" style={{ width: "18rem"}}>
      <Card.Img
        className="p-3"
        variant="top"
        src={product?.image || "/images/default-product.jpg"} // Imagen por defecto
        alt={product?.title || "Sin título"}
        style={{ height: "200px", objectFit: "contain", width: "100%" }} // Imagen con tamaño fijo
      />
      <Card.Body className="d-flex flex-column justify-content-between text-center">
        <div>
          <Card.Title className="text-truncate" title={product?.title || "Sin título"}>
            <strong>{product?.title || "Sin título"}</strong>
          </Card.Title>
          <Card.Text className="text-truncate">Precio: ${product?.price || "0"}</Card.Text>
        </div>
        <NavLink to={`/product/${product?.publication_id || "#"}`} className="w-100">
          <Button type="button" className="w-100 mt-2" variant="dark">
            Comprar
          </Button>
        </NavLink>
      </Card.Body>
    </Card>
  );
}
CardProducto.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardProducto;
