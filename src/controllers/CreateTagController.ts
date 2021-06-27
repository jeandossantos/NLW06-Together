import { Request, Response } from 'express';
import { CreateTagService } from '../services/CreateTagService';

class CreateTagController {

    async handle(req: Request, res: Response) {
        const { name } = req.body;
        const tagService = new CreateTagService();

        const user = await tagService.execute(name);

        res.status(201).json(user);
    }
}

export { CreateTagController }