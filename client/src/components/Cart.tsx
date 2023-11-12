import React from "react"
import { useTable } from 'react-table'
import "./Cart.css"

export default function Cart(props: any) {
    const itemsArray = Object.values(props.items)
    
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
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}