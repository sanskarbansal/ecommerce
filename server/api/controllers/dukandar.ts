import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import Dukandar from "../../models/Dukandar";
const login = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "Successfully logged in!",
    });
};
const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone_no, email_id, username, password, city, state, zip_postcode, country, line_1, line_2 } = req.body;
    if (!name || !phone_no || !email_id || !username || !password || !city || !state || !country || !zip_postcode) {
        return next(new Error("Please provide all the details"));
    }
    const u = await Dukandar.findOne({
        where: {
            [Op.or]: [{ email_id }, { username }, { phone_no }],
        },
    });
    if (u) {
        return next(new Error("User already Exists"));
    }
    const dukandar = await Dukandar.create({
        name: name,
        phone_no,
        email_id,
        username,
        password,
    });
    await dukandar.createAddress({
        city,
        state,
        zip_postcode,
        country,
    });

    res.status(200).json({
        message: "Successfully signup !",
        dukandar,
    });
};

export { login, signup };
