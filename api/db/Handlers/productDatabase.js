const DBSOURCE = "/home/kayyum/cashier/api/db/db.sqlite"
const sqliteHandler = require("/home/kayyum/cashier/api/db/Handlers/sqliteHandler.js") 

const sqliteHandlerObj = new sqliteHandler(DBSOURCE, "product")

module.exports = sqliteHandlerObj
