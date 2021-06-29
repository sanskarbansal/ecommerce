import { Model, DataTypes, Optional, Sequelize, Association, HasOne } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import { ProductInstance } from "./ModelTypes";

const ProductModel = sequelize.define<ProductInstance>(
    "Product",
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        mrp: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    }
);
// (async () => {})();

export default ProductModel;
