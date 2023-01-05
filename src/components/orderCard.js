import { Inputs } from "./inputs";
import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";


export function Order({ number, text, numberOrder, products, total, handleOnClick, handleOnChangeName, handleOnChangeTable }) {
	return (
        <section className="order-content">
            <div className="order-header">
                <div> 
                    <label>Cliente: </label>
                    <Inputs className="cart-input" type={text} id={"nome-do-cliente"} onChange={handleOnChangeName}></Inputs>
                </div>
                <div> 
                    <label>Mesa: </label>
                    <Inputs className="cart-input" type={number} id={"mesa-do-cliente"} onChange={handleOnChangeTable}></Inputs>
                </div>
                <p>Pedido: {numberOrder}</p>
            </div>
            {products}
            <p className="total-content">Total: R${total}</p>
            <button className="send-order-btn" onClick={handleOnClick}>Enviar pedido à cozinha</button>
        </section>
	);
}

export function Items({ name, price, handleOnClickPlus, handleOnClickLess, quantity}) {
	return (
        <div className="item-content comanda">
            <p className="product">{name}</p>
            <p className="price">R$ {price}</p>
            <p className="quantity">x{quantity}</p>
            <p className="final-price">R$ {quantity * price}</p>

            <AiOutlinePlus className="plus-sign" onClick={handleOnClickPlus}/>
            <AiOutlineLine className="plus-sign" onClick={handleOnClickLess}/>
        </div>
	);
}