import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../types/RequstType";
import { Op } from "sequelize";
import Dukandar from "../../models/Dukandar";
import jwt from "jsonwebtoken";

const login = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { email_id, username, phone_no, password }: { email_id: string | null; username: string | null; phone_no: string | null; password: string } =
        req.body;
    if (!password) return next(new Error("Please provide the password"));
    const dukandar = await Dukandar.findOne({
        where: {
            [Op.or]: [{ email_id: email_id || null }, { username: username || null }, { phone_no: phone_no || null }],
            password: password,
        },
    });
    if (!dukandar) return res.status(202).json({ message: "User not found" });
    const paylod = {
        id: dukandar.id,
        name: dukandar.name,
        dob: dukandar.dob,
        phone_no: dukandar.phone_no,
        email_id: dukandar.email_id,
        username: dukandar.phone_no,
        address: (await dukandar?.getAddress()).toJSON(),
    };
    const token = await jwt.sign(paylod, process.env.JWT_SECRETE || "SECRETE_KEY", {
        expiresIn: "12hr",
    });
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8,
    });
    res.status(200).json({
        message: "Successfully logged in!",
    });
};
const signup = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { name, phone_no, email_id, username, password, city, state, zip_postcode, country, line_1, line_2 } = req.body;
    console.log(req.body);
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
        line_1,
        line_2,
    });

    res.status(200).json({
        message: "Successfully signup !",
        dukandar,
    });
};

export { login, signup };
