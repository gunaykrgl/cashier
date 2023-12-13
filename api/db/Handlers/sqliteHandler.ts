import sqlite3 from 'sqlite3';
import dbHandler from "./databaseHandler.ts";

// @ts-ignore
import tableSchemas from "../Schemas.js";

// @ts-ignore
export default class sqliteHandler extends dbHandler.databaseHandler {
    // @ts-ignore
    constructor(path, tableName) {
        super();
        // @ts-ignore
        this.tableName = tableName;
        // @ts-ignore
        this.db = new sqlite3.Database(path, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the development database.');
        });
        // @ts-ignore
        const tableCreateQuery = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${tableSchemas.product})`
        // @ts-ignore
        this.db.run(tableCreateQuery,
            // @ts-ignore
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err)
                }
            });
    }

    async connect() {
        // @ts-ignore
        this.db = await sqlite3.open({
            // @ts-ignore
            filename: path,
            driver: sqlite3.Database
        });
    }

    async close() {
        // @ts-ignore
        this.db.close();
    }

    // @ts-ignore
    async getProduct(barcode) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM product WHERE barcode = ?";
            // @ts-ignore
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

    // @ts-ignore
    async getProducts() {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            const query = "SELECT * FROM " + this.tableName;
            // @ts-ignore
            this.db.all(query, [], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }

    // @ts-ignore
    async set(key, value) {
        // @ts-ignore
        this.db.run('INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)', [key, value]);
    }
}