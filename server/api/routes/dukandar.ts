import { Response, Router } from "express";
import { protectRoute } from "../../middlewares/authMiddleware";
import AddressModel from "../../models/Address";
import DukandarModel from "../../models/Dukandar";
import { RequestWithUser } from "../../types/RequstType";
const router = Router();

const dukandar = require("../controllers/dukandar");

router.post("/login", dukandar.login);
router.post("/signup", dukandar.signup);
router.get("/users", protectRoute(DukandarModel), async (req: RequestWithUser, res: Response) => {
    const users = await DukandarModel.findAll({});
    res.status(200).json(users);
});

export default router;
