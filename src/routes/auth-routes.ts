import express from "express";
import {  Request, Response } from "express";
import { RefreshTokenController } from "../controllers/RefreshTokenController/refresh-token-controller";
import { UserController } from "../controllers/UserController/user-controller"

const router = express.Router();
const userController = new UserController;
const refreshTokenController = new RefreshTokenController;

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/refresh_token", refreshTokenController.refreshTokenRequestHandler)
router.get("/home");

export {router as userRoutes};