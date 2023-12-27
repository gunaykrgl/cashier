import sqlite3 from 'sqlite3';
import dbHandler from "./databaseHandler.ts";

import { IProduct } from "../../src/interfaces/product.interface.ts";
import * as tableSchemas from "../Schemas.ts" ;

export default class sqliteHandler extends dbHandler.databaseHandler {
    private tableName: string;
    private db: sqlite3.Database;
    private path: string;

    constructor(path: string, tableName: string) {
        super();
        
        this.tableName = tableName;
        this.path = path;

        this.db = new sqlite3.Database(path, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the development database.');
        });
        
        const tableCreateQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${tableSchemas.product})`
        
        this.db.run(tableCreateQuery,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err)
                }
            });
    }

    async connect() {
        this.db = new sqlite3.Database(this.path);
    }

    async close() {
        this.db.close();
    }
    
    // Build a SQL query
    buildQuery(params: { [key: string]: any }){
        const keys = Object.keys(params);
        const values = Object.values(params);

        let query = `SELECT * FROM ${this.tableName} WHERE `;

        keys.forEach((key, index) => {
            query += `${key} = ?`;

            if (index < keys.length - 1) {
                query += ' AND ';
            }
        });

        return { query, values };
    }

    async query(params: { [key: string]: any }): Promise<IProduct[]> {
        return new Promise((resolve, reject) => {
            const { query, values } = this.buildQuery(params);
            console.log(query, values);
            this.db.all(query, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows as IProduct[]);
                }
            });
        });
    }

    async getProduct(barcode: string): Promise<IProduct> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM product WHERE barcode = ?";
            
            this.db.all(query, [barcode], (err, rows) => {
                if (err) {
                    reject(err);
                } else if (rows.length === 0) {
                    reject(new Error("No product found with the given barcode."));
                } else {
                    resolve(rows[0] as IProduct);
                }
            });
        });
    }

    async getProducts(): Promise<IProduct[]> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM " + this.tableName;
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows as IProduct[]);
                }
            });
        });
    }

    async updateProductQuantity(barcode: string, quantity: number): Promise<void> {
        //? This is only for reducing the quantity in db after a sale
        
        return new Promise((resolve, reject) => {
            const query = "UPDATE product SET quantity = quantity - ? WHERE barcode = ?";
            this.db.run(query, [quantity, barcode], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    // Add a new product
    async addProduct(product: IProduct): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.tableName} (barcode, name, price, quantity) VALUES (?, ?, ?, ?)`;
            this.db.run(query, [product.barcode, product.name, product.price, product.quantity], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

}