import { Router } from 'express';
import * as ticketController from '../api';

const router = Router();

// assign ticket to team or user
router.post('/assign-to-team', ticketController.assignToTeamHandler);
router.post('/assign-to-user', ticketController.assignToUserHandler);

// get tickets by category, team, system, user
router.get(
  '/categories/:id/tickets',
  ticketController.ticketsByCategoryHandler
);
router.get('/teams/:id/tickets', ticketController.ticketsByTeamHandler);
router.get('/systems/:id/tickets', ticketController.ticketsBySystemHandler);
router.get('/users/:id/tickets', ticketController.ticketByUserHandler);

router
  .route('/')
  .get(ticketController.getAllHandler)
  .post(ticketController.createHandler);

router
  .route('/:id')
  .get(ticketController.ticketByIdHandler)
  .patch(ticketController.updateHandler)
  .delete(ticketController.deleteHandler);

export default router;
