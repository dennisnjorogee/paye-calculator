// internal website routes
import { Router } from "express";
import appController from "../controllers/app.controller.js";

const router = Router();

router.get("/", appController.payeCalc);
router.get("/nssf-calculator", appController.nssfCalc);
router.get("/shif-calculator", appController.shifCalc);
router.get("/housing-levy-calculator", appController.housingLevyCalc);
router.get("/docs", appController.docs);

export default router;
