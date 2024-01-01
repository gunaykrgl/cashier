import { useEffect, useState } from "react"
import styles from "./ManageProducts.module.scss"

export default function App() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        //! GET ALL PRODUCTS AND DISPLAY THEM
        const getProductsList = async () => {
            const res = await fetch("http://localhost:9000/getProductsList")
            const data = await res.json()
            setProducts(data)
        };
        getProductsList()
    }, [])

    const [editingProduct, setEditingProduct] = useState(null);

    function handleUpdate(barcode: number) {
        setEditingProduct(barcode)

        // //! UPDATE PRODUCT IN DATABASE
        // const updateProduct = async () => {
        //     const res = await fetch("http://localhost:9000/updateProduct", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({
        //             barcode: barcode,
        //             name: "new name",
        //             price: 100,
        //             quantity: 100
        //         })
        //     })
        //     const data = await res.json()
        //     console.log(data)
        // }
    }

    return (
        <>
            <table style={styles}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Barcode</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: any) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.barcode}</td>
                            <td>
                                {editingProduct === product.barcode ?
                                    <input type="text" defaultValue={product.name} /> :
                                    product.name
                                }
                            </td>
                            <td>
                                {editingProduct === product.barcode ?
                                    <input type="text" defaultValue={product.price} /> :
                                    product.price
                                }
                            </td>
                            <td>
                                {editingProduct === product.barcode ?
                                    <input type="text" defaultValue={product.quantity} /> :
                                    product.quantity
                                }
                            </td>
                            <td>
                                {editingProduct === product.barcode ?
                                    <button onClick={() => handleUpdate(product.barcode)}>Save</button> :
                                    <button onClick={() => setEditingProduct(product.barcode)}>Update</button>
                                }
                            </td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {/* //! ALSO PUT A + BUTTON THAT ADDS A NEW PRODUCT */}
                </tbody>
            </table>
        </>
    )
}

