import React, { useEffect, useState } from "react";
import { menu, userName, createOrder, getAllOrders } from "../../contexts/api";
import { HeaderSalon } from "../../components/header";
import { Menu } from "../../components/menu";
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
  
  console.log(selectProducts);
  console.log(qtd)
  console.log(pedido)
  
  // const productsHamburguer = selectAllProducts
  //   .filter(product => product.sub_type === 'hamburguer')
  //   .map((p) => {
  
  // const breakfastMenu = selectProducts
  //   .filter(product => product.sub_type === 'breakfast')
  //   .map(product => <Item key={product.id} name={product.name} price={product.price} handleOnClick={() => selectedProductsList(product)}></Item>);

  // const breakfastMenu = selectProducts.map((product) => {
  //   if (product.sub_type === 'breakfast') {
  //     return <Item key={product.id} name={product.name} price={product.price} handleOnClick={() => selectedProductsList(product)}></Item>
  //   }
  //   return '';
  // });

  const breakfastMenu = product => product.sub_type === 'breakfast';
  const lunchMenu = product => product.sub_type === 'hamburguer';
  const sideMenu = product => product.sub_type === 'side' || product.sub_type === 'drinks';

  // const lunchMenu = selectProducts.map((product) => {
  //   if (product.sub_type === 'hamburguer') {
  //     if (product.flavor === null && product.complement === null) {
  //       return <Item key={product.id} name={product.name} price={product.price} handleOnClick={() => selectedProductsList(product)}></Item>
  //     }
  //     if (product.flavor !== null && product.complement === null) {
  //       return <Item key={product.id} name={` ${product.name} ${product.flavor} `} price={product.price} handleOnClick={() => selectedProductsList(product)}></Item>
  //     }
  //     if (product.flavor !== null && product.complement !== null) {
  //       return <Item key={product.id} name={` ${product.name} ${product.flavor} com ${product.complement} `} price={product.price} handleOnClick={() => selectedProductsList(product)}></Item>
  //     }
  //   }
  //   return '';
  // });

  // const sideMenu = selectProducts.map((product) => {
  //   if (product.sub_type === 'side' || product.sub_type === 'drinks') {
  //     return <Item key={product.id} name={product.name} price={product.price} handleOnClick={() => selectedProductsList(product)}></Item>
  //   }
  //   return '';
  // })

  function selectedProductsList(product) {
    const productIndex = selectedProducts.findIndex((e) => e.id === product.id);
    if (productIndex === -1) {
      return setSelectedProducts([...selectedProducts, {
        "id": product.id,
        "name": product.name,
        "flavor": product.flavor,
        "complement": product.complement,
        "qtd": 1,
        "price": product.price,
        "sub_type": product.sub_type,
      }]);
    } else {
      setQtd(selectedProducts[productIndex].qtd += 1);
    }
  };

  function decreaseProduct(product) {
    const productIndex = selectedProducts.findIndex((e) => e.id === product.id);
    setQtd(selectedProducts[productIndex].qtd -= 1);
    if (product.qtd === 0) {
      console.log(selectedProducts);
      return selectedProducts.splice(productIndex, 1);
    }
  }
  
  const printSelectedProducts = selectedProducts.map((product) => {
    if (product.sub_type === 'hamburguer'){
      if (product.flavor === null && product.complement === null) {
        return <Items key={product.id} quantity={product.qtd} name={product.name} price={product.price} handleOnClickPlus={() => selectedProductsList(product)} handleOnClickLess={() => decreaseProduct(product)}></Items>
      } else if (product.flavor !== null && product.complement === null) {
        return <Items key={product.id} quantity={product.qtd} name={` ${product.name} ${product.flavor} `} price={product.price} handleOnClickPlus={() => selectedProductsList(product)}  handleOnClickLess={() => decreaseProduct(product)}></Items>
      } else if (product.flavor !== null && product.complement !== null) {
        return <Items key={product.id} quantity={product.qtd} name={` ${product.name} ${product.flavor} com ${product.complement} `} price={product.price} handleOnClickPlus={() => selectedProductsList(product)}  handleOnClickLess={() => decreaseProduct(product)}></Items>
      }
    }
    return <Items key={product.id} quantity={product.qtd} name={product.name} price={product.price} handleOnClickPlus={() => selectedProductsList(product)}  handleOnClickLess={() => decreaseProduct(product)}></Items>;
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
      <Menu filterFunction={breakfastMenu} productList={selectProducts} dayShift='Café da manhã' handleOnClick={selectedProductsList}></Menu>
      <Menu filterFunction={lunchMenu} productList={selectProducts} dayShift='Almoço e janta' handleOnClick={selectedProductsList}></Menu>
      <Menu filterFunction={sideMenu} productList={selectProducts} dayShift='Acompanhamentos e bebidas' handleOnClick={selectedProductsList}></Menu>
      <Order products={printSelectedProducts} handleOnChangeName={(e) => setClientName(e.target.value)} handleOnChangeTable={(e) => setTableNumber(e.target.value)} handleOnClick={handleCreateOrder}></Order>
    </section>
  );
}
