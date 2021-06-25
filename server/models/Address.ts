import { Model, DataTypes, Optional, Sequelize } from "sequelize";
// import { UUIDV4 } from "sequelize";
import sequelize from "../config/db";

interface AddressAttributes {
    city: string;
    state: string;
    country: string;
    zip_postcode: number;
    line_1: string;
    line_2: string;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, "line_1"> {}

interface AddressInstance extends Model<AddressAttributes, AddressCreationAttributes>, AddressAttributes {}

const AddressModel = sequelize.define<AddressInstance>("Address", {
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zip_postcode: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    line_1: {
        type: DataTypes.STRING,
    },
    line_2: {
        type: DataTypes.STRING,
    },
});

export default AddressModel;
