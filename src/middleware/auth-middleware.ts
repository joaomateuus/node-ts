import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken";

type JwtPayload = {
    user_id: number;
}

const prisma = new PrismaClient()

export const authMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
    try {
        const token = _req.headers.authorization!.replace('Bearer ', '')

        const { user_id } = jwt.verify(token, '036799f4-a33a-4765-a9cc-1f95e644fe5a') as JwtPayload

        const user = prisma.user.findFirst({where:{id: user_id}})

        if (!user) {
            _res.status(403).json({message: "User not found permission denied"})
        }
        next();
    } catch (error) {
        return _res.status(401).json({ message: `Auth failed, error: ${error}`});
    }
}