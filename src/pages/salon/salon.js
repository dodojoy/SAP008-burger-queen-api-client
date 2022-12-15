import React, { useEffect, useState } from "react";
import { menu } from "../../contexts/api";
import { HeaderSalon } from "../../components/header";
import { Menu, Item } from "../../components/menu";
import { userName } from "../../contexts/api";
import logo from '../../assets/logo.svg';
import logout from '../../assets/logout.svg';
import '../../components/header.css';
import '../../components/menu.css';
import './salon.css';

export const Salon = () => {
  const [selectProducts, setSelectProducts] = useState([]);

  useEffect(() => {
    menu()
      .then((response) => response.json())
      .then((data) => {
        setSelectProducts(data);
      })
      .catch((error) => error);
  }, []);

  console.log(selectProducts);

  const breakfastMenu = selectProducts.map((p) => {
    if (p.sub_type === 'breakfast') {
      return <Item key={p.id} name={p.name} price={p.price}></Item>
    }
    return '';
  })

  const lunchMenu = selectProducts.map((p) => {
    if (p.sub_type === 'hamburguer') {
      return <Item key={p.id} name={p.name} price={p.price}></Item>
    }
    return '';
  })
  
  return (
    <section className="menu">
      <HeaderSalon atendente={userName()} logo={logo} logout={logout} ></HeaderSalon>
      <Menu hour='Café da manhã' product={breakfastMenu}></Menu>
      <Menu hour='Almoço e janta' product={lunchMenu}></Menu>
    </section>
  );
}

// product={breakfastMenu} linha 38