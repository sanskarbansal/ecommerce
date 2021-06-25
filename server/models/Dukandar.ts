import { Model, DataTypes, Optional, Sequelize, Association, HasOne } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
import Address from "./Address";

interface DukandarAttributes {
    id: string;
    name: string;
    dob?: Date;
    phone_no: string;
    email_id: string;
    username: string;
    password: string;
    address?: HasOne;
}

interface DukandarCreationAttributes extends Optional<DukandarAttributes, "id"> {}

interface DukandarInstance extends Model<DukandarAttributes, DukandarCreationAttributes>, HasOne {}

const DukandarModel = sequelize.define<any>(
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
        timestamps: false,
    }
);

DukandarModel.hasOne(Address);
Address.belongsTo(DukandarModel);

(async () => {
    await DukandarModel.sync({ force: true });
    await Address.sync({ force: true });
})();

export default DukandarModel;
