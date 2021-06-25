import { Router } from "express";
const router = Router();

const grahak = require("../controllers/grahak");

router.post("/login", grahak.login);
router.post("/signup", grahak.signup);

export default router;
