require("dotenv").config();
import express from "express";
import db from "./config/db";
import api from "./api/index";
import errorHandler from "./middlewares/errorMiddleware";
const app = express();

const PORT = process.env.PORT || 1337;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", api);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log("SERVER SUCCESSFULLY STARTED ON PORT: ", PORT);
});
