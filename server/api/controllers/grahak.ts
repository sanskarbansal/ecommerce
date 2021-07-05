import { NextFunction, Request, Response } from "express";
import GrahakModel from "../../models/Grahak";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import AddressModel from "../../models/Address";
import { RequestWithUser } from "../../types/RequestType";
import CartModel from "../../models/Cart";
import { CartInstance } from "../../models/ModelTypes";
import ProductModel from "../../models/Products";

const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email_id, username, phone_no, password }: { email_id: string | null; username: string | null; phone_no: string | null; password: string } =
        req.body;
    if (!password) return next(new Error("Please provide the password"));
    const grahak = await GrahakModel.findOne({
        where: {
            [Op.or]: [{ email_id: email_id || null }, { username: username || null }, { phone_no: phone_no || null }],
            password: password,
        },
        include: {
            model: AddressModel,
            as: "Address",
            attributes: {
                exclude: ["DukandarId"],
            },
        },
    });
    console.log(grahak);
    if (!grahak) return res.status(403).json({ error: "User not found" });
    const paylod = {
        id: grahak.id,
        name: grahak.firstName + " " + grahak.lastName,
        dob: grahak.dob,
        phone_no: grahak.phone_no,
        email_id: grahak.email_id,
        username: grahak.phone_no,
        address: grahak.Address,
    };
    const token = jwt.sign(paylod, process.env.JWT_SECRETE || "<SECRETE_KEY>", {
        expiresIn: "12hr",
    });
    // req.session.data = { ...req.session.data, token };
    res.status(200).json({
        message: "Successfully logged in!",
        token,
    });
};
const signup = async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, phone_no, email_id, username, password, city, state, zip_postcode, country, line_1, line_2, dob } = req.body;
    if (!firstName || !lastName || !phone_no || !email_id || !username || !password || !city || !state || !country || !zip_postcode) {
        return next(new Error("Please provide all the details"));
    }
    const u = await GrahakModel.findOne({
        where: {
            [Op.or]: [{ email_id }, { username }, { phone_no }],
        },
    });
    if (u) {
        return next(new Error("User already Exists"));
    }
    let grahak = await GrahakModel.create({
        firstName,
        lastName,
        phone_no,
        email_id,
        username,
        password,
        dob,
    });

    await grahak.createAddress({
        city,
        state,
        zip_postcode,
        country,
        line_1,
        line_2,
    });
    await grahak.createCart({});

    res.status(200).json({
        message: "Successfully signup !",
        grahak,
    });
};

const addToCart = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        let { productId, quantity } = req.body;
        quantity = parseInt(quantity);
        const grahak = await GrahakModel.findByPk(req.user.id);
        if (grahak) {
            const cart = await grahak.getCart({ include: ProductModel });
            const products: any = cart.Products;
            for (let product of products) {
                console.log(product.id);
                if (product.id == productId) {
                    product.CartProduct.quantity += quantity;
                    if (product.CartProduct.quantity <= 0) {
                        cart.removeProduct(product);
                    }
                    await product.CartProduct.save();
                    console.log(product.CartProduct);
                    return res.json({ cart });
                }
            }
            if (quantity <= 0) return res.json({ message: "Please provide quantity greater than 0", status: 0 });
            const product = await ProductModel.findByPk(productId);
            if (product) {
                await cart.addProduct(product, {
                    through: {
                        quantity: quantity,
                    },
                });
                console.log("called");
            }
            return res.json({ cart });
        }
        res.json({
            message: "Cart Not Found",
        });
    } catch (err) {
        console.log(err);

        return next(err);
    }
};

const getCartProducts = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const grahak = await GrahakModel.findByPk(req.user.id);
        if (grahak) {
            const cart = await grahak.getCart({ include: ProductModel });
            return res.json({ cart });
        }
    } catch (err) {
        next(err);
    }
};

export { login, signup, addToCart, getCartProducts };
