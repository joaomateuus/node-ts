import { Request, Response } from "express";
import { UserService } from "../services/create-user-service";
import { User } from "../interfaces/User";
import { Prisma } from "@prisma/client";

const userService = new UserService

export class UserController {
    async createUser(_req: Request, _res: Response): Promise<Response> {
        try {
            const createdUser = await userService.createUser(_req.body)
            return _res.status(201).json(createdUser)
        } catch (error) {
            return _res.status(400).json({error})
        }
    }

    // async loginUser(_req: Request, _res: Response){
    //     try {
    //         const { email, password } = _req.body;
    //         const user = await prisma.user.findFirst({where: {email}})
            
    //         if (!user) {
    //             _res.status(400).json({message: "Email or password are incorrect"})
    //         }
    //         const checkPassword = await bcrypt.compare(password, user.password)
    //         if (!checkPassword){
    //             _res.status(400).json({message: "Email or password are incorrect"})
    //         }

    //     } catch (error) {
    //         _res.status(400).json({error})
    //     }
    // }
}