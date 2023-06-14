import { Router } from "express";
import { getAbsenceMapping } from "../controllers/calendar";
import { checkRangeQuery } from "../middlewares/checkDate";
import { validator } from "../middlewares/validator";

export const calendarRouter = Router();

calendarRouter.get("/absences", checkRangeQuery(), validator, getAbsenceMapping);
