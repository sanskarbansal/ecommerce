import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import sequelize from "../config/db";
import { AddressInstance } from "./ModelTypes";

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
