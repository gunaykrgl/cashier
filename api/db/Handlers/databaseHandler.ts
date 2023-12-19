import { IProduct } from "../../src/interfaces/product.interface"

abstract class databaseHandler {
    abstract connect(): Promise<void>;
    abstract close(): Promise<void>;
    abstract getProducts(): Promise<any>; 
    abstract getProduct(key: any): Promise<IProduct>;
    abstract query(params: { [key: string]: any }): Promise<any>;
    abstract updateProductQuantity(barcode: string, quantity: number): Promise<void>;
}

export default { databaseHandler }