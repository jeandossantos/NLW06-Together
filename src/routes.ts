import { Router } from 'express';
import { AuthenticateController } from './controllers/AuthenticateController';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { CreateListUserReceiveController } from './controllers/CreateListUserReceiveController';
import { CreateListUserSendController } from './controllers/CreateListUserSendController';
import { ListTagsController  } from './controllers/ListTagsController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListUsersController } from './controllers/ListUsersController';

const routes = Router();

const createAuthenticateController = new AuthenticateController();
const createTagController = new CreateTagController();
const createUserController = new CreateUserController()
const createComplimentController = new CreateComplimentController();
const createListUserReceiveController = new CreateListUserReceiveController();
const createListUserSendController = new CreateListUserSendController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

routes.post('/login', createAuthenticateController.handle);
routes.post('/tags',ensureAuthenticated, ensureAdmin, createTagController.handle);
routes.get('/tags',ensureAuthenticated, ensureAdmin, listTagsController.handle);
routes.post('/users', createUserController.handle);
routes.post('/compliments', ensureAuthenticated, createComplimentController.handle);
routes.get('/users/compliments/receive', ensureAuthenticated, createListUserReceiveController.handle);
routes.get('/users/compliments/send', ensureAuthenticated, createListUserSendController.handle);
routes.get('/users', ensureAuthenticated, listUsersController.handle);

export { routes }