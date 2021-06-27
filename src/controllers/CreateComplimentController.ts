import { Request, response, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {

    async handle(req: Request, res: Response) {
        const { user_receiver, tag_id, message } = req.body;
        
        const { user_id } = req;

        const complimentService = new CreateComplimentService();

        const compliment = await complimentService.execute({
            user_sender: user_id,
            user_receiver,
            tag_id,
            message
        });

        res.status(201).json(compliment);
    }
}

export { CreateComplimentController }