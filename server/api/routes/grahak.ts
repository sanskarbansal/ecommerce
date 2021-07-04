import { Router } from "express";
const router = Router();

import * as grahak from "../controllers/grahak";

router.post("/login", grahak.login);
router.post("/signup", grahak.signup);

export default router;
