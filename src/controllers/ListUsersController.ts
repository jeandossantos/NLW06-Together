import { Request, response, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";





class ListUsersController {

    async handle(req: Request, res: Response) {

        const listUsersRepository = new ListUsersService();

        const users = await listUsersRepository.execute();

        return res.json(users);
    }
}

export { ListUsersController }