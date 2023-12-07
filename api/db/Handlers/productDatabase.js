const path = require("path")
const config = require("../../config.js")

const DBSOURCE = path.join(config.projectRoot, "db", "db.sqlite")

const sqliteHandler = require("./sqliteHandler.js") 

const sqliteHandlerObj = new sqliteHandler(DBSOURCE, "product")

module.exports = sqliteHandlerObj
