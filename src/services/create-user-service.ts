import { User } from "../interfaces/User";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { json } from "stream/consumers";

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
}