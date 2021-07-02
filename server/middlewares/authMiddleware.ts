import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ModelCtor } from "sequelize/types";
import { RequestWithUser } from "../types/RequestType";
const protectRoute = (Model: ModelCtor<any>) => async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) return next(new Error("Please sign in first!"));
        const jwtPaylod = jwt.verify(token, process.env.JWT_SECRETE || "<SECRETE_KEY>") as JwtPayload;
        if (!jwtPaylod) next(new Error("You are not authorized to do this. "));
        const user = await Model.findByPk(jwtPaylod.id);
        if (user) {
            req.user = user;
            return next();
        }
        return res.status(403).json({
            error: "You are not authorized to do this",
        });
    } catch (err) {
        next(err);
    }
};
export { protectRoute };
