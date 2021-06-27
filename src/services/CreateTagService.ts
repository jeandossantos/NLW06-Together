import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";
import { CustomErrorException } from '../exceptions/CustomErrorException';

class CreateTagService {

    async execute(name: string) {
        const tagRepository = getCustomRepository(TagRepository);

        if(!name) throw new CustomErrorException('Incorrect name');

        const tagAlreadyExists = await tagRepository.findOne({
            name
        });

        if(tagAlreadyExists) throw new CustomErrorException('Tag already exists');

        const user = tagRepository.create({ name });

        await tagRepository.save(user);

        return user;
    }
}

export { CreateTagService }