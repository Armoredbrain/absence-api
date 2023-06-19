import { Router } from "express";
import { getSplitAbsenceByMonth } from "../controllers/absence";
import { checkRangeQuery } from "../middlewares/checkDate";
import { validator } from "../middlewares/validator";

export const absenceRouter = Router();

absenceRouter.get("/splitByMonth", checkRangeQuery(), validator, getSplitAbsenceByMonth);
