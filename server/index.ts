require("dotenv").config();
import db from "./config/db";
import redis from "redis";
import express from "express";
import session from "express-session";
import api from "./api/index";
import errorHandler from "./middlewares/errorMiddleware";
import cors from "cors";

declare module "express-session" {
    export interface SessionData {
        data: { [key: string]: any };
    }
}

const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient();

const app = express();

const PORT = process.env.PORT || 1337;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: false,
        secret: process.env.SESSION_SECRETE || "<secrete>",
        cookie: {
            maxAge: 1000 * 60 * 60 * 12,
        },
        resave: false,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/", api);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log("SERVER SUCCESSFULLY STARTED ON PORT: ", PORT);
});
