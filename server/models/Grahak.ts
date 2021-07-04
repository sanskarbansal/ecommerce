import { DataTypes } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import Address from "./Address";
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
Address.belongsTo(GrahakModel);

GrahakModel.sync({
    alter: true,
});
export default GrahakModel;
