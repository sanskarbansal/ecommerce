import { Sequelize } from "sequelize";
// import AddressModel from "../models/Address";
// import DukandarModel from "../models/Dukandar";

const sequelize = new Sequelize({
    host: process.env.DB_URL,
    database: process.env.DB_NAME,
    dialect: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
});
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();
export default sequelize;
