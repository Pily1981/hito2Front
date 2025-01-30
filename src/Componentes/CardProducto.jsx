import React from 'react';
import PropTypes from 'prop-types';
import {Card, Button }  from 'react-bootstrap';

function CardProducto({ producto }) {
  return (
   <Card className="border border-dark">
        <Card.Img  className="p-3" variant="top" src={producto.img} style={{ height:'250px'}}/>      
          <Card.Body className="Cardproducto">          
            <Card.Title className="text-center">
              <h5><strong>{producto.name}</strong></h5> 
            </Card.Title> 
            <Card.Text className="text-center">
            <h5>Precio: ${producto.price}</h5></Card.Text>           
          </Card.Body> 
          <Button type="submit" className="d-flex justify-content-center aling-item-center" id="buttonCompras">Comprar</Button>                              
      </Card>  
  );
}   

CardProducto.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
};

export default CardProducto;

