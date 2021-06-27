import { getCustomRepository } from 'typeorm';
import  { UserRepository }  from '../repositories/UserRepository';
import { genSaltSync, hashSync} from 'bcryptjs';
import { CustomErrorException } from '../exceptions/CustomErrorException';

interface IUser {
    id?: string;
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({ name, email, admin = false, password }: IUser) {
        const userRepository = getCustomRepository(UserRepository);

        const salt = genSaltSync(8);
        const passwordHash = hashSync(password, salt);

        const userAlreadyExists = await userRepository.findOne({
            email
        });
                
        if(userAlreadyExists) throw new CustomErrorException('User already exists');
        
        const user = userRepository.create({
            name, 
            email,
            admin,
            password: passwordHash
        });
        
        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService }