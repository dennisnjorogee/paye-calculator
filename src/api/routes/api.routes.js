import { Router } from "express";
import apiController from "../controllers/api.controller.js";
import validationMiddleware from "../middlewares/validation.middleware.js";
const router = Router();

router.post(
  "/calculator",
  validationMiddleware.calculator,
  apiController.calculator,
);

export default router;
