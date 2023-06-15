import { Request, Response } from "express";
import logger, { ApiError } from "../console/logger";
import { Year, getGregorianCalendar, getYearIndex, intersectRange } from "../managers/main";
interface DefaultApiResponse {
    code: string | number;
    message: string;
}
// CONTROLLER
export async function getAbsenceMapping(
    req: Request,
    res: Response<Year | DefaultApiResponse, Record<string, unknown>>
): Promise<void> {
    try {
        // extract timezone ??

        // input date iso with timezone
        const start = new Date(String(req.query.start));
        const end = new Date(String(req.query.end));
        // check year range
        // build calendarChain(s) : calendar 2023 + calendar 2024
        const calendarChain: Year = {};
        for (const year of Array<number>(...new Set([getYearIndex(start), getYearIndex(end)]))) {
            Object.assign(calendarChain, { [year]: getGregorianCalendar(year) });
        }
        // intersect absence and yearChain into result -> fun but how
        const absenceSplitByMonth = intersectRange({ start, end }, calendarChain);
        // apply timezone ??

        // output calendar object with date iso string mapping
        res.status(200).json(absenceSplitByMonth);
    } catch (error) {
        logger.error(
            new ApiError(error, {
                source: getAbsenceMapping.name,
                code: error.code,
            })
        );

        res.status(500).json({ code: 500, message: error.message });
    }
}
