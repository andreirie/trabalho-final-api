import { Router } from 'express';
import CoresController from '../controllers/CoresController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const coresRouter = Router();
const coresController = new CoresController();
coresRouter.use(isAuthenticated); 

coresRouter.get('/', async (req, res, next) => {
  try {
    await coresController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

coresRouter.get('/:id', celebrate({
  [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}),
async (req, res, next) => {
  try {
    await coresController.show(req, res, next);
  } catch (err) {
    next(err);
  }
});

coresRouter.post('/',  celebrate({
  [Segments.BODY]: {
      processor_id: Joi.string().required(),
      index: Joi.number().required(),
      type: Joi.string().required(),
      max_clock_speed: Joi.number().precision(5).required(),
      local_cache: Joi.number().required(),
      multithreading: Joi.boolean().required()  
  }
}),
async (req, res, next) => {
  try {
    await coresController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});

coresRouter.put('/:id',  celebrate({
  [Segments.PARAMS] : {id: Joi.string().uuid().required()},
  [Segments.BODY]: {
      index: Joi.number().required(),
      type: Joi.string().required(),
      max_clock_speed: Joi.number().precision(5).required(),
      local_cache: Joi.number().required(),
      multithreading: Joi.boolean().required()  
  }
}),async (req, res, next) => {
  try {
    await coresController.update(req, res, next);
  } catch (err) {
    next(err);
  }
});

coresRouter.delete('/:id', celebrate({
  [Segments.PARAMS] : {id: Joi.string().uuid().required()}
}), async (req, res, next) => {
  try {
    await coresController.delete(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default coresRouter;
