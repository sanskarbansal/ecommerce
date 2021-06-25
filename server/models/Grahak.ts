import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import Address from "./Address";

interface GrahakAttributes {
    id: string;
    firstName: string;
    lastName: string;
    dob?: Date;
    phone_no: string;
    email_id: string;
    username: string;
    password: string;
}

interface GrahakCreationAttributes extends Optional<GrahakAttributes, "id"> {}

interface GrahakInstance extends Model<GrahakAttributes, GrahakCreationAttributes>, GrahakAttributes {}

const GrahakModel = sequelize.define<GrahakInstance>(
    "Grahak",
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
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

GrahakModel.hasMany(Address);
Address.belongsTo(GrahakModel);

GrahakModel.sync({
    alter: true,
});
export default GrahakModel;
