import { EntityRepository, Repository } from "typeorm";
import Processor from "../entities/Processor";

@EntityRepository(Processor)
export default class ProcessorsRepository extends Repository<Processor>{

    public async findById(id: string): Promise<Processor | undefined>{
        const processor = await this.findOne(id, {
            relations: ['cores']
        });
        return processor;
    }

    public async findByModelName(model_name: string): Promise<Processor | undefined>{
        const processor = this.findOne({
            where: { model_name }
        })
        return processor;
    }
}
