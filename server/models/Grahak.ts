import { DataTypes } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import Address from "./Address";
import CartModel from "./Cart";
import { GrahakInstance } from "./ModelTypes";

const GrahakModel = sequelize.define<GrahakInstance>(
    "Grahak",
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
        },
        dob: {
            type: DataTypes.DATE,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone_no: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        timestamps: false,
    }
);

GrahakModel.hasMany(Address, {
    as: "Address",
});
Address.belongsTo(GrahakModel, {
    as: "Grahak",
});

GrahakModel.hasOne(CartModel, {
    as: "Cart",
    foreignKey: "GrahakId",
});
CartModel.belongsTo(GrahakModel, {
    as: "Grahak",
});

(async () => {
    // CartModel.sync({ force: true });
    // GrahakModel.sync({ force: true });
    // Address.sync({ alter: true });
})();

export default GrahakModel;
