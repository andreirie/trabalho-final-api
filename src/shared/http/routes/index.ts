import processorsRouter from "@modules/processors/routes/processors.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();
routes.use('/processors', processorsRouter);
routes.use('/users', usersRouter); 
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);

export default routes;
