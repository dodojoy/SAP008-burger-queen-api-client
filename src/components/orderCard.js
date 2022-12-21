import { Inputs } from "./inputs";
import { AiOutlinePlus, AiOutlineLine } from "react-icons/ai";


export function Order({ number, text, client, tableNumber, numberOrder, products, total, handleOnClick }) {
	return (
        <section className="order-content">
            <div className="order-header">
                <div> 
                    <label for="nome-do-cliente">Cliente: </label>
                    <Inputs type={text} id={"nome-do-cliente"}>{client}</Inputs>
                </div>
                <div> 
                    <label for="mesa-do-cliente">Mesa: </label>
                    <Inputs type={number} id={"mesa-do-cliente"}>{tableNumber}</Inputs>
                </div>
                <p>Pedido: {numberOrder}</p>
            </div>
            {products}
            <p>Total: R${total}</p>
            <button onClick={handleOnClick}>Enviar pedido à cozinha</button>
        </section>
	);
}

export function Items({ name, price, handleOnClick }) {
	return (
        <div className="item-content comanda">
            <p className="product">{name}</p>
            <p className="price">R$ {price}</p>
            <AiOutlinePlus className="plus-sign" onClick={handleOnClick}/>
            <AiOutlineLine className="plus-sign"/>
        </div>
	);
}