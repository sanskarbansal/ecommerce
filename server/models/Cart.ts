import { DataTypes } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import { CartInstance } from "./ModelTypes";
import ProductModel from "./Products";

const CartProduct = sequelize.define<any>("CartProduct", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

const CartModel = sequelize.define<CartInstance>(
    "Cart",
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
        },
    },
    {
        timestamps: true,
    }
);

CartModel.belongsToMany(ProductModel, {
    through: CartProduct,
});
ProductModel.belongsToMany(CartModel, {
    through: CartProduct,
});

export default CartModel;
