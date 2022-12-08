export function Menu({ hour, product }) {
	return (
        <details className="menu-box">
            <summary className="hour-menu-text">{hour}</summary>
            {product}
        </details>
	);
}

export function Item({ name, price}) {
	return (
        <div>
            <p className="product">{name}</p>
            <p className="price">{price}</p>
            <button>+</button>
        </div>
	);
}