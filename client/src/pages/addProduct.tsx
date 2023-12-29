import React, { useState } from 'react';

export default function AddProduct() {
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        fetch('http://localhost:9000/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                barcode,
                name,
                price,
                quantity
            }),
            "credentials": "include"
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Barcode:
                    <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
                </label>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Price:
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label>
                    Quantity:
                    <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
        