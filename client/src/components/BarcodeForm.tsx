import React from "react"
import { useState } from "react"

class BarcodeForm extends React.Component {
    
    handleSubmit = (event: any) => {
        event.preventDefault()
        const barcode = event.target.barcode.value
        console.log(barcode)
        
        //! CHANGE THE NEXT LINE, IT'S JUST A LAZY WAY OF CLEANING THE FORM
        event.target.barcode.value = ''

        fetch('http://localhost:9000/api/barcode/lookup', {
            method: 'POST',
            body: barcode,
        })
    }
    render() {
        return (
            <div className='barcodeLookup'>
                <p>Enter the barcode below to look for a product:</p>
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