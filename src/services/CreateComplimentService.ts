import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { CustomErrorException } from "../exceptions/CustomErrorException";

interface ICompliment {
    user_sender: string;
    user_receiver: string;
    tag_id: string;
    message: string;
}

class CreateComplimentService {

    async execute({ user_sender, user_receiver, tag_id, message } : ICompliment) {
        const complimentRepository = getCustomRepository(ComplimentRepository);
        const userRepository = getCustomRepository(UserRepository);

        if(user_sender === user_receiver) {
            throw new CustomErrorException('User cannot praise by himself', 400);
        }

        const userExists = await userRepository.findOne({
            where: {
                id: user_receiver
            }
        });

        if(!userExists) throw new CustomErrorException('User does not exist', 400);

        const compliment = complimentRepository.create({
            user_sender,
            user_receiver,
            tag_id,
            message
        });

        await complimentRepository.save(compliment);
        
        return compliment;
    }
}

export { CreateComplimentService }
