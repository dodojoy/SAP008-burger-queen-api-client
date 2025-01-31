import { Inputs } from "./inputs";
import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";
import { getProductName } from "../productName/getProductName";


export function Order({ number, text, children, totalPrice, handleOnClick, handleOnChangeName, handleOnChangeTable }) {
	return (
        <div className="order-content">
            <div className="order-header">
                <div> 
                    <label>Cliente: </label>
                    <Inputs className="cart-input" type={text} id={"nome-do-cliente"} onChange={handleOnChangeName}></Inputs>
                </div>
                <div> 
                    <label>Mesa: </label>
                    <Inputs className="cart-input" type={number} id={"mesa-do-cliente"} onChange={handleOnChangeTable}></Inputs>
                </div>
            </div>
            {children}
            <p className="total-content">Total: R${totalPrice}</p>
            <button className="send-order-btn" onClick={handleOnClick}>Enviar pedido à cozinha</button>
        </div>
	);
}

export function Items({ handleOnClickPlus, handleOnClickLess, product }) {
    const { price, qtd } = product;
    return (
        <div className="item-content cart">
            <p className="product">{getProductName(product)}</p>
            <p className="price">R$ {price}</p>
            <p className="quantity">x{qtd}</p>
            <p className="final-price">R$ {qtd * price}</p>

            <AiOutlinePlus className="plus-sign" onClick={handleOnClickPlus} />
            <AiOutlineLine className="plus-sign" onClick={handleOnClickLess} />
        </div>
    );
}
