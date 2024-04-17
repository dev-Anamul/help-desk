import { Router } from "express";
import * as categoryController from "../api";

const router = Router();

router.get("/:id/tickets", categoryController.categoryByTicketHandler);

router
  .route("/")
  .get(categoryController.getAllHandler)
  .post(categoryController.createHandler);

router
  .route("/:id")
  .get(categoryController.categoryByIdHandler)
  .patch(categoryController.updateHandler)
  .delete(categoryController.deleteHandler);

export default router;
