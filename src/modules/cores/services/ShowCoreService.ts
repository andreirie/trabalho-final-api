import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Core from "../typeorm/entities/Core";
import CoresRepository from "../typeorm/repositories/CoresRepository";

interface IRequest{
  id: string;
}

export default class ShowCoreService{

  public async execute({id}: IRequest) : Promise<Core>{
    const coresRepository = getCustomRepository(CoresRepository);
    const core = await coresRepository.findById(id);
    if(!core){
      throw new AppError('Core not found.')
    }
    return core;
  }
}
