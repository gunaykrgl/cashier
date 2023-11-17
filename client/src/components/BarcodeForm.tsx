import React from "react"
import { useState } from "react"

class BarcodeForm extends React.Component {
    
    handleSubmit = (event: any) => {
        event.preventDefault()
        const barcode = Number(event.target.barcode.value)
        //! VALIDATE BARCODE HERE (int, string etc)

        //! CHANGE THE NEXT LINE, IT'S JUST A LAZY WAY OF CLEANING THE FORM
        event.target.barcode.value = ''

        fetch('http://localhost:9000/barcode/addToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({barcode: barcode})
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
    }
    render() {
        return (
            <div className='barcodeLookup'>
                <p>Enter the barcode below to add a product to cart:</p>
                <form onSubmit={this.handleSubmit} method="GET">
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
}
export default BarcodeForm