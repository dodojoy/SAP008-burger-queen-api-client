import { AiFillPlusCircle } from 'react-icons/ai';

export function Menu({ hour, product }) {
	return (
        <details className="menu-box">
            <summary className="meal-menu-text">{hour}</summary>
            {product}
        </details>
	);
}

export function Item({ name, price}) {
	return (
        <div className="item-content">
            <p className="product">{name}</p>
            <p className="price">R$ {price}</p>
            <AiFillPlusCircle className='plus-sign'/>
        </div>
	);
}