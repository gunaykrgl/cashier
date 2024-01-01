import { IProduct } from "../../src/interfaces/product.interface.ts";
import databaseHandler from "./databaseHandler.ts";

abstract class productDatabaseHandler extends databaseHandler {
    abstract getProducts(): Promise<IProduct[]>;
    abstract getProduct(barcode: string): Promise<IProduct>;
    abstract query(params: { [key: string]: any }): Promise<IProduct[]>;
    abstract updateProductQuantity(barcode: string, quantity: number): Promise<void>;
    abstract addProduct(product: IProduct): Promise<void>;
}

export default productDatabaseHandler;