import { Request, Response } from "express";
import { RefreshTokenService } from "../../services/RefreshTokenService/refresh-token-service";

const refreshTokenService = new RefreshTokenService

export class RefreshTokenController {
    async refreshTokenRequestHandler(_req: Request, _res: Response): Promise<Response> {
        try {
            const { refresh_token } = _req.body;

            const token = await refreshTokenService.validateRefreshToken(refresh_token);
            return _res.status(200).json({token})
        } catch (error) {
            return _res.status(400).json({error})
        }
    }
}