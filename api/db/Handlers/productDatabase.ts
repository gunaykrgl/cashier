import path from "path"
import config from "../../config.ts"

import sqliteHandler from "./sqliteHandler.ts" 

const sqliteHandlerObj = new sqliteHandler(config.DBSOURCE, "product")

module.exports = sqliteHandlerObj
