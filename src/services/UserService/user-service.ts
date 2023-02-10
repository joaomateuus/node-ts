import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { User } from "../../interfaces/User";
import { GenerateTokenProvider } from "../../providers/generate-token";
import { GenerateRefreshTokenProvider } from "../../providers/generate-refresh-token";

const prisma = new PrismaClient()

export class UserService {
    async createUser(userData: User) {
        const { email, username, password } = userData
        const userExists = await prisma.user.findFirst({where: {
            OR: [
                {email},
                {username}
            ]
        }})
        
        if (userExists) {
            throw new Error("This email or username is already in use")
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });
        const { password:_, ...user } = newUser
        return user
    }

    async loginUser(email: string, password: string) {
        const user = await prisma.user.findFirst({where: {email}});
        if (!user) {
            throw new Error( "Email or password are incorrect")
        }
        
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) {
            throw new Error ("Email or password are incorrect")
        } 
        
        const tokenProvider = new GenerateTokenProvider;
        const token = await tokenProvider.generateToken(user.id);
        
        await prisma.refreshToken.deleteMany({
            where: {
                userId: user.id
            }
        })

        const refreshTokenProvider = new GenerateRefreshTokenProvider; 
        const refresh_token = await refreshTokenProvider.generateRefreshToken(user.id)
            
        return { token, refresh_token } 
    }






}