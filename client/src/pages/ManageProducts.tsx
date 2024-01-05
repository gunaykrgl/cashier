import { useEffect, useState } from "react"
import styles from "./ManageProducts.module.scss"

interface Product {
    id: Number;
    barcode: string;
    name: string;
    price: string;
    quantity: string;
}

export default function App() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        //! GET ALL PRODUCTS AND DISPLAY THEM
        const getProductsList = async () => {
            const res = await fetch("http://localhost:9000/getProductsList")
            const data = await res.json()
            setProducts(data)
        };
        getProductsList()
    }, [])

    const [editingProductId, setEditingProductId] = useState<Number>(-1);
    const [editingProductBarcode, setEditingProductBarcode] = useState<string>("");

    const [deletingProductId, setDeletingProductId] = useState<Number>(-1);
    const [deletingProductBarcode, setDeletingProductBarcode] = useState<string>("");

    /// NEW Values
    const [newName, setNewName] = useState<string>("")
    const [newPrice, setNewPrice] = useState<string>("")
    const [newQuantity, setNewQuantity] = useState<string>("")

    // Initialize newName, newPrice, newQuantity when editingProductId changes
    useEffect(() => {
        const product = products.find((p: any) => p.id === editingProductId)
        
        setNewName(() => product?.name || "")
        setNewPrice(() => product?.price || "")
        setNewQuantity(() => product?.quantity || "")
        setEditingProductBarcode(() => product?.barcode || "")
    }, [editingProductId])

    // Initialize deletingProductBarcode when deletingProductId changes
    useEffect(() => {
        const product = products.find((p: any) => p.id === deletingProductId)
        setDeletingProductBarcode(() => product?.barcode || "")
    }, [deletingProductId])

    /// UPDATE Values
    function handleNameChange(e: any) {
        setNewName(e.target.value)
    }
    function handlePriceChange(e: any) {
        setNewPrice(e.target.value)
    }
    function handleQuantityChange(e: any) {
        setNewQuantity(e.target.value)
    }


    function handleUpdate() {
        setProducts(()=> {
            return products.map((p: any) => {
                if (p.id === editingProductId) {
                    return {
                        ...p,
                        barcode: editingProductBarcode,
                        name: newName,
                        price: newPrice,
                        quantity: newQuantity
                    }
                }
                return p
            })
        })

        // //! UPDATE THE PRODUCT IN THE DATABASE
        fetch("http://localhost:9000/updateProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                barcode: editingProductBarcode,
                name: newName,
                price: newPrice,
                quantity: newQuantity
            }),
            credentials: "include"
        })

        //! Do not forget to reset editingProductId to -1
        setEditingProductId(-1)
    }

    function handleDelete() {
        setProducts(() => {
            return products.filter((p: any) => p.id !== deletingProductId)
        })
        // //! DELETE THE PRODUCT IN THE DATABASE
        fetch("http://localhost:9000/deleteProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                barcode: deletingProductBarcode
            }),
            credentials: "include"
        })

        setDeletingProductId(-1)
    }

    function handleAddItem() {
        setProducts(() => {
            return [...products, {id: products.length + 1, barcode: "", name: "", price: "", quantity: ""}]
        })
        fetch("http://localhost:9000/addProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                barcode: "",
                name: "",
                price: "",
                quantity: ""
            }),
            credentials: "include"
        })
    }

    return (
        <>
            <button onClick={handleAddItem}>Add New Product</button>
            <hr />
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
                                {editingProductId === product.id ?
                                    <input type="text" defaultValue={product.name} onChange={handleNameChange}/> :
                                    product.name
                                }
                            </td>
                            <td>
                                {editingProductId === product.id ?
                                    <input type="text" defaultValue={product.price} onChange={handlePriceChange} /> :
                                    product.price
                                }
                            </td>
                            <td>
                                {editingProductId === product.id ?
                                    <input type="text" defaultValue={product.quantity} onChange={handleQuantityChange} /> :
                                    product.quantity
                                }
                            </td>
                            <td>
                                {/* Update Button */}
                                {editingProductId === product.id ?
                                    <button onClick={() => handleUpdate()}>Save</button> :
                                    <button onClick={() => setEditingProductId(product.id)}>Update</button>
                                }
                            </td>
                            <td>
                                {/* Delete Button */}
                                { deletingProductId === product.id ?
                                    <button onClick={()=> handleDelete()}>Sure to delete</button>:
                                    <button onClick={()=> setDeletingProductId(product.id)}>Delete</button>
                                }
                            </td>
                        </tr>
                    ))}
                    {/* //! ALSO PUT A + BUTTON THAT ADDS A NEW PRODUCT */}
                </tbody>
            </table>
        </>
    )
}

