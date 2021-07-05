import sequelize from "./db";
require("../models/Dukandar");
require("../models/Grahak");
require("../models/Cart");
require("../models/ProductFeature");
require("../models/Products");

(async () => {
    sequelize.sync({
        alter: true,
    });
})();
export default sequelize;
