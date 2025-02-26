import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Table, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";

const OrdersPage = () => {
  const { user, token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${urlBase}/api/my_purchases/${user.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(response.data.message ? [] : response.data);
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las órdenes.",
        });
      }
    };

    fetchOrders();
  }, [user?.user_id, token]);

  return (
    <Container>
      <h2 className="my-4 text-center">Mis productos comprados</h2>
      {orders.length === 0 ? (
        <p className="text-center">No has comprado ningún producto.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Order_id</th> 
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Vendedor</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.Order_id}>
                <td>{index + 1}</td>
                <td>{order.Order_id}</td> 
                <td>{order.Producto}</td>
                <td>{order.Descripción}</td>
                <td>${order.Precio}</td>
                <td>{order.Cantidad}</td>             
                <td>
                  {order.Vendedor}
                </td>
                <td>{order.Email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className="text-center mt-4">
        <Button variant="warning" onClick={() => window.history.back()}>
          Volver
        </Button>
      </div>
    </Container>
  );
};

export default OrdersPage;
