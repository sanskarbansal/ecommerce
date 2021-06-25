import { Model, DataTypes, Optional, Sequelize, Association, HasOne } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import Address from "./Address";
import { DukandarInstance } from "./ModelTypes";

const DukandarModel = sequelize.define<DukandarInstance>(
    "Dukandar",
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
        },
        dob: {
            type: DataTypes.DATE,
        },
        name: {
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
        timestamps: true,
    }
);

DukandarModel.hasOne(Address, {
    as: "Address",
    foreignKey: "DukandarId",
});
Address.belongsTo(DukandarModel);

(async () => {
    await DukandarModel.sync({ force: true });
    await Address.sync({ force: true });
})();

export default DukandarModel;