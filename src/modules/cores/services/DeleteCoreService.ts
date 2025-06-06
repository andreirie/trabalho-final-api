import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CoresRepository from "../typeorm/repositories/CoresRepository";

interface IRequest{
  id: string;
}

export default class DeleteCoreService{

  public async execute({id}: IRequest) : Promise<void>{
    const coresRepository = getCustomRepository(CoresRepository);

    const core = await coresRepository.findById(id);
    if(!core){
      throw new AppError('Core not found.');
    }

   await coresRepository.remove(core);
  }
}
