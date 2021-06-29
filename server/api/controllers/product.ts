import { NextFunction, Response } from "express";
import DukandarModel from "../../models/Dukandar";
import ProductModel from "../../models/Products";
import { RequestWithUser } from "../../types/RequestType";
export default {
    getProducts: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const products = await ProductModel.findAll({
            include: {
                model: DukandarModel,
                as: "Dukandar",
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt"],
                },
            },
        });
        return res.json(products);
    },
};
