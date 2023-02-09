import { Request, Response } from "express";
import { UserService } from "../../services/UserService/user-service";

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
    
    async loginUser(_req: Request, _res: Response): Promise<Response>{
        try {
            const { email, password } = _req.body;
            const tokens = await userService.loginUser(email, password);
            return _res.status(200).json(tokens)
        } catch (error) {
            return _res.status(400).json({error})
        }
    }
}