import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()

export class UserController {
    async createUser(_req: Request, _res: Response) {
        try {
            const { email, username, password, password_confirm } = _req.body;
            const userExists = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })
            if (userExists) {
                return _res.status(400).json({message: "User already exists"})
            }
            if (password !== password_confirm){
                return _res.status(400).json({message: "Password and Password Confirm didnt match"})
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
            return _res.status(201).json({user})
        } catch (error) {
            _res.status(400).json({error})
        }
    }
}

