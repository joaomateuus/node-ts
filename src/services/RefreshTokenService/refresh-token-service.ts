import { PrismaClient } from "@prisma/client"
import dayjs from "dayjs";
import { GenerateTokenProvider } from "../../providers/generate-token"
import { GenerateRefreshTokenProvider } from "../../providers/generate-refresh-token";

const prisma = new PrismaClient()

export class RefreshTokenService {
    async validateRefreshToken(refresh_token: string) {
        const refreshToken = await prisma.refreshToken.findFirst({
            where: {
                id: refresh_token
            },
        });
        
        if (!refreshToken) {
            throw new Error("Refresh token invalid");
        }

        const generateTokenProvider = new GenerateTokenProvider;
        const token = await generateTokenProvider.generateToken(refreshToken.userId);

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
        
        if (refreshTokenExpired) {
            await prisma.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            });
            const refreshTokenProvider = new GenerateRefreshTokenProvider;
            const newRefreshToken = await refreshTokenProvider.generateRefreshToken(refreshToken.userId);
            return { token, refresh_token: newRefreshToken }
        }
        return {token: token};
    }
}