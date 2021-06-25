import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import sequelize from "../config/db";
interface RolesAttributes {
    id: number;
    role: string;
}

const roles: { role: string }[] = [{ role: "Dukandar" }, { role: "Grahak" }];

interface RolesCreationAttributes extends Optional<RolesAttributes, "id"> {}

interface RolesInstance extends Model<RolesAttributes, RolesCreationAttributes>, RolesAttributes {}

const RolesModel = sequelize.define<RolesInstance>("Role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role: {
        type: DataTypes.STRING,
        unique: true,
    },
});

// RolesModel.sync({ force: true }).then(() => {
//     RolesModel.bulkCreate(roles);
// });
export default RolesModel;
