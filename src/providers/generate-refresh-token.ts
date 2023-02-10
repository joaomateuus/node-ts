import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient()

export class GenerateRefreshTokenProvider{
    async generateRefreshToken(userId: number) {
        const expiresIn = dayjs().add(1, "day").unix()
        
        const refreshToken = await prisma.refreshToken.create({data:{userId, expiresIn}})
        return refreshToken 
    }
}