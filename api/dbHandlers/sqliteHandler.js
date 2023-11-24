var sqlite3 = require('sqlite3')
var dbHandler = require("./databaseHandler.js");

class sqliteHandler extends dbHandler.databaseHandler {
    constructor(path) {
        super();
        this.db = new sqlite3.Database(path, (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Connected to the development database.');
        });
        const tableCreateQuery = `CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY,
            barcode INTEGER UNIQUE,
            name text, 
            quantity INTEGER,
            price INTEGER
            )`;

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
            filename: './db.sqlite',
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

    async set(key, value) {
        this.db.run('INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)', [key, value]);
    }
}

module.exports = {
    sqliteHandler: sqliteHandler
};