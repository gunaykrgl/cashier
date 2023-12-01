const DBSOURCE = "./db.sqlite"
const sqliteHandler = require("./sqliteHandler") 

const sqliteHandlerObj = new sqliteHandler(DBSOURCE, "product")

module.exports = sqliteHandlerObj
