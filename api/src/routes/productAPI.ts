import { Router, Request, Response, NextFunction } from 'express';
import { join } from "path";
import config from "../../config";
import sqliteHandler from "../../db/Handlers/sqliteHandler.ts";

// const sqliteHandler: any = require(join(config.projectRoot, "db", "Handlers", "sqliteHandler.ts"));
const db: any = new sqliteHandler(config.DBSOURCE, "product");

const router: Router = Router();

router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("Product API Main Page");
})

// Get all products
router.get("/getProductsList", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await db.getProducts()
    res.status(200).json(rows)
  }
  catch (err){
    console.log(err)
  }

});

// Get Product by barcode
router.get("/getProduct", async (req: Request, res: Response) => {
  const barcode: string = req.query?.barcode as string;
  console.log(barcode);
  try {
    const row = await db.getProduct(barcode);
    res.status(200).json(row);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Query products
router.get("/query", async (req: Request, res: Response) => {
  const params: { [key: string]: any } = req.query;
  try {
    const rows = await db.query(params);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;