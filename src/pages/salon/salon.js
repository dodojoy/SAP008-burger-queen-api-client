import React, { useEffect, useState } from "react";
import { menu, userName, createOrder, getAllOrders, updateStatus} from "../../contexts/api";
import { HeaderSalon } from "../../components/header";
import { Menu, PrintFinishedOrder } from "../../components/menu";
import { Order, Items } from "../../components/orderCard";
import { FilteredOrderProduct } from "../../components/kitchenProduct";
import '../../components/header.css';
import '../../components/menu.css';
import '../../components/orderCard.css';
import './salon.css';
import { BiCheckboxChecked } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

export const Salon = () => {
  const [selectProducts, setSelectProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [clientName, setClientName] = useState('');
  const [tableNumber, setTableNumber] = useState(1);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    menu()
      .then((response) => response.json())
      .then((data) => {
        setSelectProducts(data);
      })
      .catch((error) => error);
  }, []);

  useEffect(() => {
    getAllOrders()
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.log(error));
  }, []);

  function handleLogout() {
    navigate('/login')
  }

  const breakfastMenu = product => product.sub_type === 'breakfast';
  const lunchMenu = product => product.sub_type === 'hamburguer';
  const sideMenu = product => product.sub_type === 'side' || product.sub_type === 'drinks';
  const doneOrders = product => product.status === 'done';
  const deliveredOrders = product => product.status === 'finished';

  function selectedProductsList(product) {
    const productIndex = selectedProducts.findIndex((e) => e.id === product.id);
    if (productIndex === -1) {
      return setSelectedProducts([...selectedProducts, { ...product, ...{ qtd: 1 } }]);
    } else {
      selectedProducts[productIndex].qtd += 1;
      setSelectedProducts([...selectedProducts]);
    }
  };

  function decreaseProduct(product) {
    const productIndex = selectedProducts.findIndex((e) => e.id === product.id);
    selectedProducts[productIndex].qtd -= 1;
    if (product.qtd === 0) {
      selectedProducts.splice(productIndex, 1);
      setSelectedProducts([...selectedProducts]);
    }
  }

  function PrintSelectedProducts({ products }) {
    return products.map((product) => {
      return <Items key={product.id} product={product} handleOnClickPlus={() => selectedProductsList(product)} handleOnClickLess={() => decreaseProduct(product)}></Items>;
    })
  }

  const handleCreateOrder = () => {
    createOrder(clientName, tableNumber, selectedProducts)
    .then((response) => response.json())
    .then(() => {
      setClientName('');
      setTableNumber('');
      setSelectedProducts([]);
      })
      .catch((error) => console.log(error));
  }

  function toStatusFinished(order) {
    updateStatus('finished', order.id)
      .then(() => window.location.reload());
  }


  return (
    <div className="salon-page">
      <div className="bg-salon"></div>
      <HeaderSalon role={'Atendente'} nameRole={userName()} handleOnClick={handleLogout}></HeaderSalon>
      <section className="menu">
        <div className="container">
          <Menu filterFunction={breakfastMenu} productList={selectProducts} dayShift='Café da manhã' handleOnClick={selectedProductsList}></Menu>
          <Menu filterFunction={lunchMenu} productList={selectProducts} dayShift='Almoço e janta' handleOnClick={selectedProductsList}></Menu>
          <Menu filterFunction={sideMenu} productList={selectProducts} dayShift='Acompanhamentos e bebidas' handleOnClick={selectedProductsList}></Menu>
          <Order handleOnChangeName={(e) => setClientName(e.target.value)} handleOnChangeTable={(e) => setTableNumber(e.target.value)} handleOnClick={handleCreateOrder} totalPrice={selectedProducts.reduce((result, product) => result + product.price * product.qtd, 0)}>
            <PrintSelectedProducts products={[...selectedProducts]} />
          </Order>
          <FilteredOrderProduct dayShift={'Pedidos finalizados'} orderList={orders} filterFunction={doneOrders} orderStatus={'Entregar pedido'} statusFunction={toStatusFinished}></FilteredOrderProduct>
          <PrintFinishedOrder sideTag={<p className="align-tag"><BiCheckboxChecked className='checkbox'></BiCheckboxChecked>Entregue</p>} dayShift={'Pedidos entregues'} orderList={orders} filterFunction={deliveredOrders}></PrintFinishedOrder>
        </div>
      </section>
    </div>
  );
}
