import React from "react"
import { useTable } from 'react-table'

export default function Cart(props: any) {
    const itemsArray = Object.values(props.items)
    console.log(itemsArray)
    return (
        <div className="cartTable">
            <table>
                <thead>
                    <tr style={{ borderBottom: '2px solid black' }}>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Item</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Quantity</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Per Item Price</th>
                        <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsArray.map((item: any) => (
                            <tr style={{ borderBottom: '1px solid black' }}>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{item.name}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{item.quantity}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{item.price}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{item.price * item.quantity}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}