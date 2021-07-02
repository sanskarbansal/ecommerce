import { Model, DataTypes, Optional, Sequelize, Association, HasOne } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import { ProductInstance } from "./ModelTypes";
import ProductFeatureModel from "./ProductFeature";

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
            type: DataTypes.STRING(1000),
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
        imageName: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: true,
    }
);

ProductModel.hasMany(ProductFeatureModel, {
    as: "ProductFeature",
});
ProductFeatureModel.belongsTo(ProductModel, {
    as: "Product",
});

(async () => {
    // ProductModel.sync({ alter: true });
})();

export default ProductModel;
