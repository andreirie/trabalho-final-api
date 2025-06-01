import CreateProcessorService from "../services/CreateProcessorService";
import DeleteProcessorService from "../services/DeleteProcessorService";
import ListProcessorService from "../services/ListProcessorService";
import ShowProcessorService from "../services/ShowProcessorService";
import UpdateProcessorService from "../services/UpdateProcessorService";
import { Request, Response, NextFunction } from 'express';

export default class ProcessorsController {
  
public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const listProcessors = new ListProcessorService();
      const processors = await listProcessors.execute();
      return response.json(processors);
    } catch (err) {
      next(err);
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const showProcessor = new ShowProcessorService();
      const processor = await showProcessor.execute({ id });
      return response.json(processor);
    } catch (err) {
      next(err);
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { model_name, manufacturer, architecture, total_cache, base_clock_speed } = request.body;
      const createProcessor = new CreateProcessorService();
      const processor = await createProcessor.execute({ model_name, manufacturer, architecture, total_cache, base_clock_speed });
      return response.json(processor);
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { model_name, manufacturer, architecture, total_cache, base_clock_speed } = request.body;
      const { id } = request.params;
      const updateProcessor = new UpdateProcessorService();
      const processor = await updateProcessor.execute({ id, model_name, manufacturer, architecture, total_cache, base_clock_speed });
      return response.json(processor);
    } catch (err) {
      next(err);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const deleteProcessor = new DeleteProcessorService();
      await deleteProcessor.execute({ id });
      return response.json([]);
    } catch (err) {
      next(err);
    }
  }
}
