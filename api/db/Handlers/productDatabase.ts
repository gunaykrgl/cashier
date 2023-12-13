import path from "path"
import config from "../../config.ts"

const DBSOURCE = path.join(config.projectRoot, "db", "db.sqlite")

import sqliteHandler from "./sqliteHandler.ts" 

const sqliteHandlerObj = new sqliteHandler(DBSOURCE, "product")

module.exports = sqliteHandlerObj
