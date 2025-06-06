import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Processor from "../typeorm/entities/Processor";
import ProcessorsRepository from "../typeorm/repositories/ProcessorsRepository";

interface IRequest{
    id: string;
    model_name: string;
    manufacturer: string;
    architecture: string;
    total_cache: number;
    base_clock_speed: number;
}

export default class UpdateProcessorService{

    public async execute({id, model_name, manufacturer, architecture, total_cache, base_clock_speed}: IRequest) : Promise<Processor>{
        const processorsRepository = getCustomRepository(ProcessorsRepository);
        const processor = await processorsRepository.findById(id);
        if(!processor){
            throw new AppError('Processor not found.');
        }
        
        const processorExists = await processorsRepository.findByModelName(model_name);
        if(processorExists && model_name != processor.model_name){
            throw new AppError('There is already one processor with this name.');
        }
        processor.model_name = model_name;
        processor.manufacturer = manufacturer;
        processor.architecture = architecture;
        processor.total_cache = total_cache;
        processor.base_clock_speed = base_clock_speed;

        await processorsRepository.save(processor);

        return processor;
    }
}
