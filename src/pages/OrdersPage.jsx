import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../Componentes/stylesheets/OrdersPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Componentes/Sidebar";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Redirige si no hay token
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token || !user.user_id) return;

      try {
        const urlBase = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const response = await axios.get(
          `${urlBase}/api/find_user_by_id/${user.user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchProfileData();
  }, [token, user]); // 👈 Aquí está el arreglo de dependencias

  useEffect(() => {
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
    <div className="container-orderPage">
      <div className="grid-container-orderPage">
        <div className="left-column-orderPage">
          <div className="left-row-1-orderPage">
            <div className="Welcome-orderPage">
              {data ? (
                <p>Hola, {data.name}</p>
              ) : (
                <p>Cargando datos del usuario...</p>
              )}
            </div>
            <div className="image-text-container-orderPage">
              <div className="icon-orderPage">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="text-wrapper-orderPage">Mis Compras</div>
            </div>
          </div>

          <div className="left-row-2-orderPage">
            <aside className="orderPage-sidebar">
              <Sidebar/>
            </aside>
          </div>
        </div>

        <div className="center-column-orderPage">
          <main className="orderPage-content">
            <div className="top-row-orderPage">
              <div className="container-table">
                <h2 className="my-4 text-center">Mis Compras</h2>
                {orders.length === 0 ? (
                  <p className="text-center">
                    No has comprado ningún producto.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <Table
                      striped
                      bordered
                      hover
                      responsive
                      className="order-table"
                    >
                      <thead>
                        <tr>
                          <th>Order_id</th>
                          <th>Producto</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th>Vendedor</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.Order_id}>
                            <td>{order.Order_id}</td>
                            <td>{order.Producto}</td>
                            <td>${order.Precio}</td>
                            <td>{order.Cantidad}</td>
                            <td>{order.Vendedor}</td>
                            <td>{order.Email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
