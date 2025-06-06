import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Core from "../typeorm/entities/Core";
import CoresRepository from "../typeorm/repositories/CoresRepository";
import ProcessorRepository from "@modules/processors/typeorm/repositories/ProcessorsRepository";

interface IRequest{
    processor_id: string;
    index: number;
    type: string;
    max_clock_speed: number;
    local_cache: number;
    multithreading: boolean;
}

export default class CreateCoreService{

  public async execute({processor_id, index, type, max_clock_speed, local_cache, multithreading}: IRequest) : Promise<Core>{
    const coresRepository = getCustomRepository(CoresRepository);
    const processorsRepository = getCustomRepository(ProcessorRepository);

    const processor = await processorsRepository.findById(processor_id);
    if(!processor){
      throw new AppError('Processor not found.');
    }

    const coreExists = await coresRepository.findOne({
      where: { processor, index },
    });

    if (coreExists) {
      throw new AppError('Core with this index already exists for the processor');
    }

    const core = coresRepository.create({
      processor, 
      index,
      type,
      max_clock_speed,
      local_cache,
      multithreading
    });
    await coresRepository.save(core);
    return core;
  }

}
