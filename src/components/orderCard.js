import { Inputs } from "./inputs";
import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";


export function Order({ number, text, numberOrder, products, total, handleOnClick, handleOnChangeName, handleOnChangeTable }) {
	return (
        <section className="order-content">
            <div className="order-header">
                <div> 
                    <label>Cliente: </label>
                    <Inputs type={text} id={"nome-do-cliente"} onChange={handleOnChangeName}></Inputs>
                </div>
                <div> 
                    <label>Mesa: </label>
                    <Inputs type={number} id={"mesa-do-cliente"} onChange={handleOnChangeTable}></Inputs>
                </div>
                <p>Pedido: {numberOrder}</p>
            </div>
            {products}
            <p className="total-content">Total: R${total}</p>
            <button className="send-order-btn" onClick={handleOnClick}>Enviar pedido à cozinha</button>
        </section>
	);
}

export function Items({ name, price, handleOnClickPlus, handleOnClickLess }) {
	return (
        <div className="item-content comanda">
            <p className="product">{name}</p>
            <p className="price">R$ {price}</p>
            <AiOutlinePlus className="plus-sign" onClick={handleOnClickPlus}/>
            <AiOutlineLine className="plus-sign" onClick={handleOnClickLess}/>
        </div>
	);
}