import { AiOutlinePlus } from "react-icons/ai";
import { getProductName } from "../productName/getProductName";



export function MenuBox({ dayShift, product }) {
    return (
        <details className="menu-box">
            <summary className="meal-menu-text">{dayShift}</summary>
            <div className="product-side">{product}</div>
        </details>
    );
}

export function Menu({ productList, filterFunction, handleOnClick, dayShift }) {
    const filterDayShift = productList.filter(filterFunction);
    const printProducts = filterDayShift.map(product => (
        <Item handleOnClick={() => handleOnClick(product)} key={product.id} product={product}></Item>
    ))
    return (
        <MenuBox dayShift={dayShift} product={printProducts}></MenuBox>
    )
}

export function Item({ product, handleOnClick }) {
    return (
        <div className="item-content">
            <p className="product">{getProductName(product)}</p>
            <p className="price">R$ {product.price}</p>
            <AiOutlinePlus className="plus-sign" onClick={handleOnClick} />
        </div>
    );
}

export function FinishedOrder({ product, sideTag }) {
    return (
		<div className="finished-order-box">
            <p className="number-order align-tag">Pedido número {product.id}</p>
            <p className="align-tag">Mesa {product.table}</p>
            {sideTag}
        </div>
	);
}

export function PrintFinishedOrder( { orderList, filterFunction, dayShift, orderStatus, sideTag }) {
    const filterStatusOrder = orderList.filter(filterFunction);
    const printOrder = filterStatusOrder.map((product, index) => <FinishedOrder product={product} orderStatus={orderStatus} key={index} sideTag={sideTag}></FinishedOrder>)
    return (
        <MenuBox product={printOrder} dayShift={dayShift}></MenuBox>
    )
}