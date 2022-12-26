import React, { useEffect, useState } from "react";
import { menu, userName, createOrder, getAllOrders } from "../../contexts/api";
import { HeaderSalon } from "../../components/header";
import { Menu, Item } from "../../components/menu";
import { Order, Items } from "../../components/orderCard";
import logo from '../../assets/logo.svg';
import logout from '../../assets/logout.svg';
import '../../components/header.css';
import '../../components/menu.css';
import '../../components/orderCard.css';
import './salon.css';

export const Salon = () => {
  const [selectProducts, setSelectProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [qtd, setQtd] = useState(1);
  const [clientName, setClientName] = useState('');
  const [tableNumber, setTableNumber] = useState(1);
  const [pedido, setPedido] = useState([]);

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
      .then((data) => {
        setPedido(data);
      })
  }, []);
    
  console.log(pedido);
  
  const breakfastMenu = selectProducts.map((p) => {
    if (p.sub_type === 'breakfast') {
      return <Item key={p.id} name={p.name} price={p.price} handleOnClick={() => selectedProductsList(p)}></Item>
    }
    return '';
  });

  const lunchMenu = selectProducts.map((p) => {
    if (p.sub_type === 'hamburguer') {
      if (p.flavor === null && p.complement === null) {
        return <Item key={p.id} name={p.name} price={p.price} handleOnClick={() => selectedProductsList(p)}></Item>
      }
      if (p.flavor !== null && p.complement === null) {
        return <Item key={p.id} name={` ${p.name} ${p.flavor} `} price={p.price} handleOnClick={() => selectedProductsList(p)}></Item>
      }
      if (p.flavor !== null && p.complement !== null) {
        return <Item key={p.id} name={` ${p.name} ${p.flavor} com ${p.complement} `} price={p.price} handleOnClick={() => selectedProductsList(p)}></Item>
      }
    }
    return '';
  });

  const sideMenu = selectProducts.map((p) => {
    if (p.sub_type === 'side' || p.sub_type === 'drinks') {
      return <Item key={p.id} name={p.name} price={p.price} handleOnClick={() => selectedProductsList(p)}></Item>
    }
    return '';
  })

  function selectedProductsList(p) {
    const productId = selectedProducts.findIndex((e) => e.id === p.id);
    if (productId === -1) {
      return setSelectedProducts([...selectedProducts, {
        "id": p.id,
        "name": p.name,
        "flavor": p.flavor,
        "complement": p.complement,
        "qtd": 1,
        "price": p.price,
        "sub_type": p.sub_type,
      }]);
    } else {
      setQtd(selectedProducts[productId].qtd += 1);
    }
  };
  
  const printSelectedProducts = selectedProducts.map((p) => {
    if (p.sub_type === 'hamburguer'){
      if (p.flavor === null && p.complement === null) {
        return <Items key={p.id} name={p.name} price={p.price}></Items>
      } else if (p.flavor !== null && p.complement === null) {
        return <Items key={p.id} name={` ${p.name} ${p.flavor} `} price={p.price}></Items>
      } else if (p.flavor !== null && p.complement !== null) {
        return <Items key={p.id} name={` ${p.name} ${p.flavor} com ${p.complement} `} price={p.price}></Items>
      }
    }
    return <Items name={p.name} price={p.price}></Items>;
  })

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

  return (
    <section className="menu">
      <HeaderSalon atendente={userName()} logo={logo} logout={logout} ></HeaderSalon>
      <Menu hour='Café da manhã' product={breakfastMenu}></Menu>
      <Menu hour='Almoço e janta' product={lunchMenu}></Menu>
      <Menu hour='Acompanhamentos e bebidas' product={sideMenu}></Menu>
      <Order products={printSelectedProducts} handleOnChangeName={(e) => setClientName(e.target.value)} handleOnChangeTable={(e) => setTableNumber(e.target.value)} handleOnClick={handleCreateOrder}></Order>
    </section>
  );
}

// product={breakfastMenu} linha 38