import { Model, DataTypes, Optional, Sequelize, Association, HasOne } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import Address from "./Address";
import { ProductFeatureInstance } from "./ModelTypes";
import ProductModel from "./Products";

const ProductFeatureModel = sequelize.define<ProductFeatureInstance>(
    "ProductFeature",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

export default ProductFeatureModel;
