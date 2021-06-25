import { Router } from "express";
import UserModel from "../../models/User";
const router = Router();

const dukandar = require("../controllers/dukandar");

router.post("/login", dukandar.login);
router.post("/signup", dukandar.signup);

router.get("/users", async (req, res) => {
    const users = await UserModel.findAll();
    res.json(users);
});

export default router;
