import React, { useEffect, useState } from "react";
import '../salon/salon.css';
import { HeaderSalon } from "../../components/header";
import { updateStatus, userName } from "../../contexts/api";
import { useNavigate } from 'react-router-dom';
import { getAllOrders } from "../../contexts/api";
import { FilteredOrderProduct } from "../../components/kitchenProduct";
import '../../components/kitchenProduct.css';

export const Kitchen = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  function handleLogout() {
    navigate('/login');
  }

  useEffect(() => {
    getAllOrders()
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(orders)

  const pendingOrders = product => product.status === 'pending';
  const preparingOrders = product => product.status === 'preparing';
  const finishedOrders = product => product.status === 'done';

  function toStatusPreparing(order) {
    updateStatus('preparing', order.id)
      .then(() => window.location.reload());
  }

  function toStatusDone(order) {
    updateStatus('done', order.id)
      .then(() => window.location.reload());
  }

  return (
    <section className="menu">
      <HeaderSalon role={'Cozinheiro(a)'} nameRole={userName()} handleOnClick={handleLogout}></HeaderSalon>
      <FilteredOrderProduct orderStatus={'Preparar'} dayShift={'PEDIDOS PENDENTES'} orderList={orders} filterFunction={pendingOrders} statusFunction={toStatusPreparing}></FilteredOrderProduct>
      <FilteredOrderProduct orderStatus={'Finalizar'} dayShift={'PEDIDOS EM PRODUÇÃO'} orderList={orders} filterFunction={preparingOrders} statusFunction={toStatusDone}></FilteredOrderProduct>
      <FilteredOrderProduct dayShift={'PEDIDOS FINALIZADOS'} orderList={orders} filterFunction={finishedOrders}></FilteredOrderProduct>
    </section>
  );
}
