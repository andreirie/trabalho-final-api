import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, async (req, res, next) => {
    try {
      await usersController.index(req, res, next);
    } catch (err) {
      next(err);
    }
  });

usersRouter.post('/',  celebrate({
  [Segments.BODY]: {
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}),
async (req, res, next) => {
  try {
    await usersController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});

export default usersRouter;
