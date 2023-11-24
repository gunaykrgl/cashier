var sqlite3 = require('sqlite3')

const DBSOURCE = "db.sqlite"
const dbPath = 'api/db.sqlite'

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS product (
            id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
            barcode INTEGER UNIQUE,
            name text, 
            quantity INTEGER,
            price INTEGER
            )`,
            (err) => {
                if (err) {
                    // Table already created
                    console.log("Some error")
                    console.log(err)
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO product (name, quantity, price, barcode) VALUES (?,?,?, ?)'
                    db.run(insert, ["demo", 2, 6, 123456789012])
                }
            });
    }
});


module.exports = db
