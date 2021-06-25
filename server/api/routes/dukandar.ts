import { Router } from "express";
import AddressModel from "../../models/Address";
import DukandarModel from "../../models/Dukandar";
const router = Router();

const dukandar = require("../controllers/dukandar");

router.post("/login", dukandar.login);
router.post("/signup", dukandar.signup);

router.get("/users", async (req, res) => {
    const users = await DukandarModel.findAll();
    console.log((await users[0].getAddress()).toJSON());
    res.json(users);
});

export default router;
