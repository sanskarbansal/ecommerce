import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../types/RequestType";
import { Op } from "sequelize";
import Dukandar from "../../models/Dukandar";
import jwt from "jsonwebtoken";
import multer, { Field } from "multer";
import path from "path/posix";
import { randomBytes } from "crypto";
import ProductModel from "../../models/Products";

const productPath = path.resolve("uploads", "products");

var productStorage = multer.diskStorage({
    destination: function (req: Request, file, cb: any) {
        cb(null, productPath);
    },
    filename: function (req: Request, file, cb: any) {
        cb(null, randomBytes(8).toString("hex") + path.extname(file.originalname));
    },
});

var productUpload = multer({ storage: productStorage });

export default {
    login: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const { email_id, username, phone_no, password }: { email_id: string | null; username: string | null; phone_no: string | null; password: string } =
            req.body;
        if (!password) return next(new Error("Please provide the password"));
        const dukandar = await Dukandar.findOne({
            where: {
                [Op.or]: [{ email_id: email_id || null }, { username: username || null }, { phone_no: phone_no || null }],
                password: password,
            },
        });
        if (!dukandar) return res.status(403).json({ error: "User not found" });
        const paylod = {
            id: dukandar.id,
            name: dukandar.name,
            dob: dukandar.dob,
            phone_no: dukandar.phone_no,
            email_id: dukandar.email_id,
            username: dukandar.phone_no,
            address: (await dukandar?.getAddress()).toJSON(),
        };
        const token = jwt.sign(paylod, process.env.JWT_SECRETE || "<SECRETE_KEY>", {
            expiresIn: "12hr",
        });
        // req.session.data = { ...req.session.data, token };
        res.status(200).json({
            message: "Successfully logged in!",
            token,
        });
    },
    signup: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const { name, phone_no, email_id, username, password, city, state, zip_postcode, country, line_1, line_2, dob } = req.body;
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
        let dukandar = await Dukandar.create({
            name: name,
            phone_no,
            email_id,
            username,
            password,
            dob,
        });
        // console.log("Called", name, phone_no, email_id, password, username, dob);

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
    },
    addProduct: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const dukandar = await Dukandar.findByPk(req.user.id);
        if (!dukandar) return next(new Error("No User Found! Please Login First"));
        productUpload.single("productImage")(req, res, async (err: any) => {
            if (err) next(err);
            try {
                let { name, description, price, mrp, productFeatures } = req.body;
                const product = await dukandar.createProduct({
                    name,
                    description,
                    price,
                    mrp,
                    imageName: req.file!.filename || "default.jpg",
                });
                if (productFeatures != "undefined") {
                    productFeatures = JSON.parse(productFeatures);
                    for (let feature of productFeatures) {
                        await product.createProductFeature(feature);
                    }
                }

                return res.json(product);
            } catch (err) {
                next(err);
            }
        });
    },
    getProduct: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const { onlyNames, stock } = req.query;
        let { limit, page }: any = req.query;
        limit = parseInt(limit) || 5;
        page = parseInt(page) || 1;
        const totalItems = await ProductModel.count({
            where: {
                DukandarId: req.user.id,
            },
        });
        let products;
        if (onlyNames === "1") {
            const attributes = ["name", "id"];
            stock ? attributes.push("inStock") : null;
            products = await (await Dukandar.findByPk(req.user.id))?.getProducts({ attributes });
        } else {
            products = await (await Dukandar.findByPk(req.user.id))?.getProducts({ offset: (page - 1) * limit, limit });
        }
        return res.json({ products, totalItems });
    },
    maintainStock: async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            let { productIds } = req.body;
            try {
                productIds = JSON.parse(productIds);
            } finally {
                console.log(productIds);
                for (let p of productIds) {
                    const product = await ProductModel.findByPk(p.id);
                    if (product && product.DukandarId == req.user.id) {
                        product.inStock += parseInt(p.value);
                        product.save();
                    }
                }
                return res.json({
                    message: "Products Stock Maintained Successfully",
                    status: 1,
                });
            }
        } catch (err) {
            return next(err);
        }
    },
};
