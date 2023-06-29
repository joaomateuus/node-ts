import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/welcome", (_req: Request, res: Response) => {
    res.status(200).send({
        sucess: true,
        message: "Welcome to our nodejs api",
        version: "1.0.0"
    });
});

export {router};