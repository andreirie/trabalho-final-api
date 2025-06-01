import { EntityRepository, Repository } from "typeorm";
import Processor from "../entities/Processor";

@EntityRepository(Processor)
export default class ProcessorRepository extends Repository<Processor>{

    public async findByModelName(model_name: string): Promise<Processor | undefined>{
        const processor = this.findOne({
            where: { model_name }
        })
        return processor;
    }
}
