import { Router } from "express";
const router = Router();
import Product from "../controllers/product";

router.get("/", Product.getProducts);

export default router;
