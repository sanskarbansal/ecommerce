import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ModelCtor } from "sequelize/types";
import { RequestWithUser } from "../types/RequstType";

const protectRoute = (Model: ModelCtor<any>) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        if (!req.session.data || !req.session.data?.token) return next(new Error("Please sign in first!"));
        let token = req.session.data?.token;

        const jwtPaylod = jwt.verify(token, process.env.JWT_SECRETE || "<SECRETE_KEY>") as JwtPayload;

        if (!jwtPaylod) next(new Error("You are not authorized to do this. "));
        const user = await Model.findByPk(jwtPaylod.id);
        if (user) {
            req.user = user;
            return next();
        }
    } catch (err) {
        next(err);
    }
};
export { protectRoute };
