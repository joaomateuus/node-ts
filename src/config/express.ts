import express from "express";
import { router } from "../routes/index";

const createServer = ():express.Application => {
    const app = express();
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json());
    app.use(router);
    app.get("/", (_req, res) => {
        res.send("Hello World")
    })

    return app;
};

export {createServer};


