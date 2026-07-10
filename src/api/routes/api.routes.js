import { Router } from "express";
import apiController from "../controllers/api.controller.js";
import validationMiddleware from "../middlewares/validation.middleware.js";
const router = Router();

router.post(
  "/bulk-calculate",
  validationMiddleware.bulkCalculate,
  apiController.bulkCalculate,
);

export default router;
