import "./Cart.css"
import { FaTrash } from "react-icons/fa";

export default function Cart(props: any) {
    const itemsArray = Object.values(props.items);
    console.log(itemsArray[0]);

    return (
        <div className="cartTable">
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Per Item Price</th>
                        <th>Price</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {itemsArray.map((item: any) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.price * item.quantity}</td>
                            <td>
                                <button onClick={() => props.removeItem(item.barcode)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}