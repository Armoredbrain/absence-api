import { Request, Response } from "express";
import logger, { ApiError } from "../console/logger";
import { splitAbsenceByMonth, Range } from "../managers/main";
interface DefaultApiResponse {
    code: string | number;
    message: string;
}
export async function getSplitAbsenceByMonth(
    req: Request,
    res: Response<Range[] | DefaultApiResponse, Record<string, unknown>>
): Promise<void> {
    try {
        const start = new Date(String(req.query.start));
        const end = new Date(String(req.query.end));
        const absenceSplitByMonth = splitAbsenceByMonth({ start, end });
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
