export default function BarcodeForm(props: any) {
    // Creates a text field for barcode
    function handleSubmit(event: any) {
        event.preventDefault();

        // Access the form data
        const barcodeValue : number = parseInt(event.target.elements.barcode.value);

        const product: Product = props.productsList.find((product: Product) => product.barcode == barcodeValue)

        // Check if the product exists
        if (!product) {
            alert('Product not found')
            return
        }    

        // Check if the product is already in the cart
        const productInCart = props.cart.find((product: Product) => product.barcode === barcodeValue);
        if (productInCart?.quantity >= product?.quantity ||
            product?.quantity <= 0
            ) {
            alert('Not enough stock')
            return
        }

        if (productInCart) {
            const updatedCart = props.cart.map((product: Product) => {
                if (product.barcode === barcodeValue) {
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    };
                }
                return product;
            });
            props.setCart([...updatedCart]);
        }
        else {
            props.setCart([...props.cart, { ...product, quantity: 1}])
        }

        // Reset the form
        event.target.reset();
    }


    return (
        <>
            <p>Enter the barcode below to add a product to cart:</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="barcode"
                    autoComplete="off"
                    placeholder="barcode"

                    autoFocus
                    required
                />

                <input type="submit" value="Submit" />
            </form>
        </>
    )
}