var sqlite3 = require('sqlite3')

const DBSOURCE = "db.sqlite"
const sqliteHandler = require("./sqliteHandler") 

const sqliteHandlerObj = new sqliteHandler(DBSOURCE)

module.exports = sqliteHandlerObj
