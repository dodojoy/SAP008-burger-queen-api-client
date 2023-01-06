import { AiOutlinePlus } from "react-icons/ai";

export function MenuBox({ dayShift, product }) {
    return (
        <details className="menu-box">
            <summary className="meal-menu-text">{dayShift}</summary>
            {product}
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
            <p className="product">{product.name}</p>
            <p className="price">R$ {product.price}</p>
            <AiOutlinePlus className="plus-sign" onClick={handleOnClick} />
        </div>
    );
}