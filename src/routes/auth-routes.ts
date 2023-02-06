import express from "express";
import {  Request, Response } from "express";

const router = express.Router();

router.post("/signup");
router.post("/login");
router.get("/home");

export {router};