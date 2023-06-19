import { Request, Response } from "express";
import { splitAbsenceByMonth, DateRange, convertToUtcDate } from "../managers/main";
import logger, { ApiError } from "../console/logger";

interface DefaultApiResponse {
    code: string | number;
    message: string;
}
export async function getSplitAbsenceByMonth(
    req: Request,
    res: Response<DateRange[] | DefaultApiResponse, Record<string, Date>>
): Promise<void> {
    try {
        const start = String(req.query.start);
        const end = String(req.query.end);
        const absenceSplitByMonth = splitAbsenceByMonth({ start: convertToUtcDate(start), end: convertToUtcDate(end) });
        res.status(200).json(absenceSplitByMonth);
    } catch (error) {
        logger.error(
            new ApiError(error, {
                source: getSplitAbsenceByMonth.name,
                code: error.code,
            })
        );
        res.status(500).json({ code: 500, message: error.message });
    }
}
