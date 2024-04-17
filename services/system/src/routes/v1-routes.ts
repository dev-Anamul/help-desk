import { Router } from "express";

import * as systemController from "../api";

const router = Router();

router
  .route("/")
  .get(systemController.getAllHandler)
  .post(systemController.createHandler);

router
  .route("/:id")
  .get(systemController.systemByIdHandler)
  .patch(systemController.updateHandler)
  .delete(systemController.deleteHandler);

export default router;
