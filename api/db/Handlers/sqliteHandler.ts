import sqlite3 from 'sqlite3';
import dbHandler from "./databaseHandler.ts";

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

    async getProduct(barcode: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM product WHERE barcode = ?";
            
            this.db.all(query, [barcode], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }
        )
    }

    async getProducts() : Promise<any>{
        return new Promise((resolve, reject) => {
            
            const query = "SELECT * FROM " + this.tableName;
            
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}