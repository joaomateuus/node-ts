import express from "express";
import { router } from "../routes/index";
import { userRoutes } from "../routes/auth-routes"
import morgan from "morgan";
import cors from "cors";

const createServer = (): express.Application => {
    const app = express();
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(cors({
        origin: '*'
    }));

    app.use("/api/v1", router);
    app.use('/account/auth', userRoutes)
    
    return app;
};

export {createServer};


