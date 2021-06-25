import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";
interface UserAttributes {
    id: string;
    name: string;
    dob?: Date;
    phone_no: string;
    email_id: string;
    username: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const UserModel = sequelize.define<UserInstance>(
    "User",
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
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

UserModel.sync({
    alter: true,
});
export default UserModel;
