import { Router } from 'express';

import * as userController from '../api';

const router = Router();

router
  .route('/')
  .get(userController.getAllHandler)
  .post(userController.createHandler);

router
  .route('/:id')
  .get(userController.userByIdHandler)
  .patch(userController.updateHandler)
  .delete(userController.deleteHandler);

export default router;
