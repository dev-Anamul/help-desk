import { Router } from 'express';

import { memberHandlers, teamHandlers } from '../api';

const router = Router();

router.get('/:id/tickets', teamHandlers.ticketsByTeamHandler);

// routes form members
router
  .route('/:id/members')
  .post(memberHandlers.createMemberHandler)
  .get(memberHandlers.getAllMembersHandler);

router
  .route('/:id/members/:member_id')
  .get(memberHandlers.getMemberHandler)
  .delete(memberHandlers.deleteMemberHandler);

// routes for team
router
  .route('/')
  .get(teamHandlers.getAllHandler)
  .post(teamHandlers.createHandler);

router
  .route('/:id')
  .get(teamHandlers.teamByIdHandler)
  .patch(teamHandlers.updateHandler)
  .delete(teamHandlers.deleteHandler);

export default router;
