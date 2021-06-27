import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateController {

    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const authService = new AuthenticateUserService();

        const token = await authService.execute({ email, password });

        res.json(token);
    }
}

export { AuthenticateController }