const sqlite3 = require('sqlite3')
const dbHandler = require("./databaseHandler.js");
const tableSchemas = require("../Schemas.js");

class sqliteHandler extends dbHandler.databaseHandler {
    constructor(path, tableName) {
        super();
        this.tableName = tableName;
        this.db = new sqlite3.Database(path, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the development database.');
        });
        const tableCreateQuery = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${tableSchemas.product})`
        this.db.run(tableCreateQuery,
            (err) => {
                if (err) {
                    // Table already created
                    console.log(err)
                }
            });
    }

    async connect() {
        this.db = await sqlite3.open({
            filename: path,
            driver: sqlite3.Database
        });
    }

    async close() {
        this.db.close();
    }

    async getProduct(barcode) {
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

    async getProducts() {
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

    async set(key, value) {
        this.db.run('INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)', [key, value]);
    }
}

module.exports = sqliteHandler