import { getCustomRepository } from "typeorm";
import Processor from "../typeorm/entities/Processor";
import ProcessorsRepository from "../typeorm/repositories/ProcessorsRepository";

export default class ListProcessorService{

    public async execute() : Promise<Processor[]>{
        const processorsRepository = getCustomRepository(ProcessorsRepository);
        const processors = await processorsRepository.find();
        return processors;
    }
}
