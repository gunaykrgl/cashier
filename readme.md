## API

### product API

#### GET end-points

/getProduct?barcode --> 
    barcode: barcode parameter to filter
    return: a single Product object

/getAllProducts -->
    return: list of all available products

/query?params
    params: a set of params to filter products array
    return: an array of Products


### Payment API

/finalize?Cart
    params: Cart => an array of products that the customer has added to the cart

