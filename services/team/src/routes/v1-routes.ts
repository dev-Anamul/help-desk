import { Router } from "express";

import * as teamController from "../api";

const router = Router();

router.get("/:id/tickets", teamController.teamByTicketsHandler);
router.get("/:id/members", teamController.teamByMembersHandler);

router
  .route("/")
  .get(teamController.getAllHandler)
  .post(teamController.createHandler);

router
  .route("/:id")
  .get(teamController.teamByIdHandler)
  .patch(teamController.updateHandler)
  .delete(teamController.deleteHandler);

export default router;
