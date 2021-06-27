import { UserRepository } from "../repositories/UserRepository"
import { getCustomRepository } from "typeorm"
import { CustomErrorException } from "../exceptions/CustomErrorException";
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuth {
    email: string;
    password: string;
}
class AuthenticateUserService {

    async execute({ email, password } : IAuth) {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne({ email });

        if(!user) throw new CustomErrorException('Email/Password incorrect', 400);

        const passwordMatch = compareSync(password, user.password);

        if(!passwordMatch) throw new CustomErrorException('Email/Password incorrect', 400);

        const token = sign({ name: user.email }, '4204957e27fa164a6782c54bc24ecb8e', {
            subject: user.id,
            expiresIn: '1d'
        });

        return token;

    }
}

export { AuthenticateUserService }