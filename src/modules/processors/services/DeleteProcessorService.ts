import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import ProcessorsRepository from "../typeorm/repositories/ProcessorsRepository";

interface IRequest{
    id: string;
}

export default class DeleteProcessorService{

    public async execute({id}: IRequest) : Promise<void>{
        const processorsRepository = getCustomRepository(ProcessorsRepository);
        const processor = await processorsRepository.findOne(id);
        if(!processor){
            throw new AppError('Processor not found.');
        }
        await processorsRepository.remove(processor); 
    }
}
