import { Router } from 'express';
import ProcessorsController from '../controllers/ProcessorsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const processorsRouter = Router();
const processorsController = new ProcessorsController();
processorsRouter.use(isAuthenticated); 

processorsRouter.get('/', async (req, res, next) => {
  try {
    await processorsController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

processorsRouter.get('/:id', celebrate({
  [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}),
async (req, res, next) => {
  try {
    await processorsController.show(req, res, next);
  } catch (err) {
    next(err);
  }
});

processorsRouter.post('/',  celebrate({
  [Segments.BODY]: {
      model_name: Joi.string().required(),
      manufacturer: Joi.string().required(),
      architecture: Joi.string().required(),
      base_clock_speed: Joi.number().precision(5).required(),
      total_cache: Joi.number().required(),
  }
}),
async (req, res, next) => {
  try {
    await processorsController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});

processorsRouter.put('/:id',  celebrate({
  [Segments.PARAMS] : {id: Joi.string().uuid().required()},
  [Segments.BODY]: {
      model_name: Joi.string().required(),
      manufacturer: Joi.string().required(),
      architecture: Joi.string().required(),
      base_clock_speed: Joi.number().precision(5).required(),
      total_cache: Joi.number().required(),
  }
}),async (req, res, next) => {
  try {
    await processorsController.update(req, res, next);
  } catch (err) {
    next(err);
  }
});

processorsRouter.delete('/:id', celebrate({
  [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}), async (req, res, next) => {
  try {
    await processorsController.delete(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default processorsRouter;
