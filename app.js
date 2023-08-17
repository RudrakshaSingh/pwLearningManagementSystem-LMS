import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true })); //for params to parse encoded url

app.use(
    cors({
        origin: [process.env.FRONTEND_URL], //to use api in different user
        credentials: true, // to let cookie or credentials trvel through
    })
);

app.use(cookieParser()); //to let token in cookies parse

app.use(morgan("dev")); // dev level ki information console pe print karna

app.use("/ping", (req, res) => {
    //to check if server is running
    res.send("Pong");
});

//routes in 3 modules
app.use("/api/v1/user", userRoutes);

app.all("*", (req, res) => {
    //if any random url is seraches expect defined ones
    res.status(404).send("OOPS!! 404 page not fount");
});

app.use(errorMiddleware);

export default app;
