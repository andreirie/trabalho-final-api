import { getCustomRepository } from "typeorm";
import Core from "../typeorm/entities/Core";
import CoreRepository from "../typeorm/repositories/CoresRepository";

export default class LisCoreService{

    public async execute() : Promise<Core[]>{
      const coreRepository = getCustomRepository(CoreRepository);
      const cores = await coreRepository.find();
      return cores;
    }
}
