import { Router } from "express";
import { dukandar, grahak } from "./routes";

const router = Router();
router.use("/dukandar", dukandar);
router.use("/grahak", grahak);

export default router;
