import { NextFunction, Request, Response } from "express";
import DukandarModel from "../../models/Dukandar";
import ProductFeatureModel from "../../models/ProductFeature";
import ProductModel from "../../models/Products";
import { RequestWithUser } from "../../types/RequestType";
export default {
    getProducts: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        let { limit, page }: any = req.query;
        limit = parseInt(limit) || 5;
        page = parseInt(page) || 1;
        const products = await ProductModel.findAndCountAll({
            limit,
            offset: (page - 1) * limit,
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
    getProduct: async (req: Request, res: Response) => {
        const { id } = req.params;
        console.log(id);
        const products = await ProductModel.findByPk(id, {
            include: [
                {
                    model: DukandarModel,
                    as: "Dukandar",
                    attributes: {
                        exclude: ["password"],
                    },
                },
                {
                    model: ProductFeatureModel,
                    as: "ProductFeature",
                },
            ],
        });
        res.json(products);
    },
};
