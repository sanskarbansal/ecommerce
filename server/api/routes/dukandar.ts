import { Response, Router } from "express";
import { protectRoute } from "../../middlewares/authMiddleware";
import AddressModel from "../../models/Address";
import DukandarModel from "../../models/Dukandar";
import { RequestWithUser } from "../../types/RequestType";
const router = Router();

import dukandar from "../controllers/dukandar";

router.post("/login", dukandar.login);
router.post("/signup", dukandar.signup);
router.post("/addproduct", protectRoute(DukandarModel), dukandar.addProduct);
router.get("/products", protectRoute(DukandarModel), dukandar.getProduct);
export default router;
