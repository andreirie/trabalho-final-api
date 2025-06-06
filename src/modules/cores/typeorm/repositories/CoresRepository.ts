import { EntityRepository, Repository } from "typeorm";
import Core from "../entities/Core";

@EntityRepository(Core)
export default class CoresRepository extends Repository<Core>{

  public async findByIndex(index: number): Promise<Core | undefined>{
    const core = await this.findOne({
      where: {
        index,
      },
    });
    return core;
  }

  public async findById(id: string): Promise<Core | undefined>{
    const core = await this.findOne(id, {
      relations: ['processor']
    });
    return core;
  }

}
