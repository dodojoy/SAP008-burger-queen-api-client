import { getProductName } from "../productName/getProductName";
import { MenuBox } from "./menu";

export function Product({ product }) {
    return (
        <div className="item-content item-kitchen">
            <p className="product">{getProductName(product)}</p>
            <p className="quantity">x{product.qtd}</p>
        </div>
    )
}

export function OrderedProduct({ products, product, orderStatus, handleOnclick }) {
	return (
		<div className="order-box">
            <div className="order-header">
                <p>Cliente: {product.client_name}</p>
                <p>Mesa: {product.table}</p>
                <p>Pedido: {product.id}</p>
            </div>
            {products}
            <button className="status-btn" onClick={handleOnclick}> {orderStatus}</button>
        </div>
	);
}

export function FinishedProduct({ products, product, orderStatus, handleOnclick }) {
	return (
		<div className="order-box">
            <div className="order-header">
                <p>Cliente: {product.client_name}</p>
                <p>Mesa: {product.table}</p>
                <p>Pedido: {product.id}</p>
            </div>
            {products}
        </div>
	);
}

export function FilteredOrderProduct( { orderList, filterFunction, dayShift, orderStatus, statusFunction }) {
    const filterStatusOrder = orderList.filter(filterFunction);
    const printOrder = filterStatusOrder.map((product, index) => <OrderedProduct handleOnclick={() => statusFunction(product)} orderStatus={orderStatus} product={product} key={index} products={product.Products.map((product) => {
        return <Product product={product} key={product.id}></Product>
    })}></OrderedProduct>)
    return (
        <MenuBox product={printOrder} dayShift={dayShift}></MenuBox>
    )
}
