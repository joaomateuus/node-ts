import express from "express";
import {  Request, Response } from "express";
import { UserController } from "../controllers/user-controller"

const router = express.Router();
const userController = new UserController;

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/home");

export {router as userRoutes};