import AppError from "@shared/errors/AppError";
import { getCustomRepository, Index } from "typeorm";
import Core from "../typeorm/entities/Core";
import CoresRepository from "../typeorm/repositories/CoresRepository";

interface IRequest{
    id: string;
    index: number;
    type: string;
    max_clock_speed: number;
    local_cache: number;
    multithreading: boolean;
}

export default class UpdateCoreService{

    public async execute({ id, index, type, max_clock_speed, local_cache, multithreading}: IRequest) : Promise<Core>{
        const coresRepository = getCustomRepository(CoresRepository);

        const core = await coresRepository.findById(id);
        if(!core){
            throw new AppError('Core not found.');
        }
        
        const coreExists = await coresRepository.findByIndex(index);
        if(coreExists && index != core.index){
            throw new AppError('There is already one core with this index.');
        }

        core.index = index;
        core.type = type;
        core.max_clock_speed = max_clock_speed;
        core.local_cache = local_cache;
        core.multithreading = multithreading;

        await coresRepository.save(core);

        return core;
    }
}
