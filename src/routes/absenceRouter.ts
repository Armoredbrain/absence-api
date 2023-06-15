import { Router } from "express";
import { getAbsenceMapping } from "../controllers/absence";
import { checkRangeQuery } from "../middlewares/checkDate";
import { validator } from "../middlewares/validator";

export const absenceRouter = Router();

absenceRouter.get("/absences", checkRangeQuery(), validator, getAbsenceMapping);
