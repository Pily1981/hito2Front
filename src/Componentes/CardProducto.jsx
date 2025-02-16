import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

//realizar un useEffect donde traiga la id del producto
function CardProducto({ product }) {
  return (
    <Card className="border border-dark Cardproducto">
      <Card.Img
        className="p-3"
        variant="top"
        src={product?.image || "producto sin imagen"}
        alt={product?.title || "Sin título"}
        style={{ height: "250px", objectFit: "cover" }}
      />
      <Card.Body className=" d-flex flex-column align-items-center">
        <Card.Title className="text-center">
          <strong>{product?.title || "Sin título"}</strong>
        </Card.Title>
        <Card.Text className="text-center">Precio: ${product.price}</Card.Text>
        <NavLink to={`/product/${product.publication_id}`}>
          <Button type="button" className="w-90 mt-2" id="buttonCompras">
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
