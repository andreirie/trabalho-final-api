import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Processor from "../typeorm/entities/Processor";
import ProcessorsRepository from "../typeorm/repositories/ProcessorsRepository";

interface IRequest{
    id: string;
}

export default class ShowProcessorService{

    public async execute({id}: IRequest) : Promise<Processor>{
        const processorsRepository = getCustomRepository(ProcessorsRepository);
        const processor = await processorsRepository.findById(id);
        if(!processor){
            throw new AppError('Processor not found.');
        }
        return processor;
    }
}
