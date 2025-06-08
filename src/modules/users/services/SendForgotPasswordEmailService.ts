import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";
import path from 'path';

interface IRequest{
    email: string;
}

export default class SendForgotPasswordEmailService{
    public async execute({email} : IRequest) : Promise<void>{
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);
        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
        const user = await usersRepository.findByEmail(email);
        if(!user){
            throw new AppError('User does not exists.');
        }
        const {token} = await userTokensRepository.generate(user.id);
        console.log(token);
        await EtherealMail.sendMail({
            to: {name: user.username, email: user.email},
            subject: '[API CPU] Password Recovery',
            templateData:{
                file: forgotPasswordTemplate,
                variables:{
                    name: user.username,
                    link: `http://localhost:3000/reset_password?token=${token}`
                }
            }
        })
    }
}