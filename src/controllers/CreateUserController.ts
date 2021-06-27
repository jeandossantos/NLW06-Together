import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {

    async handle(req: Request, res: Response) {
        const { name, email, admin, password } = req.body;
    
        const userService = new CreateUserService();

        const user = await userService.execute({ name, email, admin, password });
        
        return res.status(201).json(user);
    }
}

export { CreateUserController }