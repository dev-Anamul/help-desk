import { Router } from "express";
import * as ticketController from "../api";

const router = Router();

router.get("/categories/:id/tickets", ticketController.categoryByTicketHandler);
router.get("/teams/:id/tickets", ticketController.teamByTicketHandler);

router
  .route("/")
  .get(ticketController.getAllHandler)
  .post(ticketController.createHandler);

router
  .route("/:id")
  .get(ticketController.ticketByIdHandler)
  .patch(ticketController.updateHandler)
  .delete(ticketController.deleteHandler);

export default router;
