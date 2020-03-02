import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryStatusController from './app/controllers/DeliveryStatusController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id', DeliveryStatusController.index);
routes.get(
  '/deliveryman/:deliverymanId/finished',
  DeliveryStatusController.show
);
routes.put(
  '/deliveryman/:deliverymanId/:deliveryId',
  DeliveryStatusController.update
);

routes.post(
  '/delivery/:delivery_id/problems',
  DeliveryProblemsController.store
);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

module.exports = routes;
