import { Router } from "express";
import { protectRoute } from "../../middlewares/authMiddleware";
import GrahakModel from "../../models/Grahak";
const router = Router();

import * as grahak from "../controllers/grahak";

router.post("/login", grahak.login);
router.post("/signup", grahak.signup);
router.post("/addToCart", protectRoute(GrahakModel), grahak.addToCart);
router.get("/getCartProducts", protectRoute(GrahakModel), grahak.getCartProducts);

export default router;
