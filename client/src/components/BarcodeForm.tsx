export default function BarcodeForm() {
    return (
        <div className='barcodeLookup'>
            <p>Enter the barcode below to look for a product:</p>
            <form action="/submit" method="GET">
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
        </div>
    )
}