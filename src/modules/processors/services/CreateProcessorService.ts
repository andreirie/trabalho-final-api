import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Processor from "../typeorm/entities/Processor";
import ProcessorsRepository from "../typeorm/repositories/ProcessorsRepository";

interface IRequest{
    model_name: string;
    manufacturer: string;
    architecture: string;
    total_cache: number;
    base_clock_speed: number;
}

export default class CreateProcessorService{

    public async execute({model_name, manufacturer, architecture, total_cache, base_clock_speed}: IRequest) : Promise<Processor>{
        const processorsRepository = getCustomRepository(ProcessorsRepository);
        
        const processorExists = await processorsRepository.findByModelName(model_name);
        if(processorExists){
            throw new AppError('There is already one processor with this name.');
        }

        const processor = processorsRepository.create({
            model_name, manufacturer, architecture, total_cache, base_clock_speed
        });
        await processorsRepository.save(processor);
        return processor;
    }
}
