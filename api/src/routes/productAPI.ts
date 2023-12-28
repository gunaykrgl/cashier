import { Router, Request, Response, NextFunction } from 'express';
import { join } from "path";
import config from "../../config";
import sqliteHandler from "../../db/Handlers/sqliteHandler.ts";
import jwt from "jsonwebtoken";

// const sqliteHandler: any = require(join(config.projectRoot, "db", "Handlers", "sqliteHandler.ts"));
const db: sqliteHandler = new sqliteHandler(config.DBSOURCE, "product");

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(403).json({ error: 'Not authenticated' });
  }
  try {
    //! Move secret key toa more secure place
    const user = jwt.verify(token, "secretKey");
    console.log(user)
    // req.user = user;

    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: 'Invalid token' });
  }
};

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
  catch (err) {
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

// Make the purchase
router.post("/finalizeCart", async (req: Request, res: Response) => {
  const cartItems: { barcode: string, quantity: number }[] = req.body;
  console.log(cartItems);
  try {
    for (const item of cartItems) {
      const { barcode, quantity } = item;
      await db.updateProductQuantity(barcode, quantity);
    }
    res.status(200).json({ message: "Cart finalized successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new product
router.post("/addProduct", isAuthenticated, async (req: Request, res: Response) => {
  // barcode, name, price, quantity
  const { barcode, name, price, quantity } = req.body;
  try {
    await db.addProduct({ barcode, name, price, quantity });
    res.status(200).json({ message: "Product added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;