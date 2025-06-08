import CreateCoreService from "../services/CreateCoreService";
import DeleteCoreService from "../services/DeleteCoreService";
import ListCoreService from "../services/ListCoreService";
import ShowCoreService from "../services/ShowCoreService";
import UpdateCoreService from "../services/UpdateCoreService";
import { Request, Response, NextFunction } from 'express';

export default class CoresController {
  
public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const listCores = new ListCoreService();
      const cores = await listCores.execute();
      return response.json(cores);
    } catch (err) {
      next(err);
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const showCore = new ShowCoreService();
      const core = await showCore.execute({ id });
      return response.json(core);
    } catch (err) {
      next(err);
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { processor_id, index, type, max_clock_speed, local_cache, multithreading } = request.body;
      const createCore = new CreateCoreService();
      const core = await createCore.execute({ processor_id, index, type, max_clock_speed, local_cache, multithreading });
      return response.json(core);
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { index, type, max_clock_speed, local_cache, multithreading } = request.body;
      const { id } = request.params;
      const updateCore = new UpdateCoreService();
      const core = await updateCore.execute({id, index, type, max_clock_speed, local_cache, multithreading });
      return response.json(core);
    } catch (err) {
      next(err);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const deleteCore = new DeleteCoreService();
      await deleteCore.execute({ id });
      return response.json([]);
    } catch (err) {
      next(err);
    }
  }
}
