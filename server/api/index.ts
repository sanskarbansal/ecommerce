import { Router } from "express";
import { dukandar, grahak, product } from "./routes";

const router = Router();
router.use("/dukandar", dukandar);
router.use("/grahak", grahak);
router.use("/products", product);

export default router;
