import { Router } from "express";
import AddressModel from "../../models/Address";
import DukandarModel from "../../models/Dukandar";
const router = Router();

const dukandar = require("../controllers/dukandar");

router.post("/login", dukandar.login);
router.post("/signup", dukandar.signup);

export default router;
