import { Router } from "express";
const router = Router();
import Product from "../controllers/product";

router.get("/", Product.getProducts);
router.get("/:id", Product.getProduct);

export default router;
