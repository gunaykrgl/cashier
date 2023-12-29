import { FaTrash } from "react-icons/fa";
import styles from "./Cart.module.scss";

export default function Cart(props: any) {
    const itemsArray = Object.values(props.items);    

    return (
        <div className={styles.tableContainer}>
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