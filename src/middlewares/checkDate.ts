import { query, ValidationChain } from "express-validator";
import logger, { ApiError } from "../console/logger";

export function checkRangeQuery(): ValidationChain[] {
    return [
        query(["start", "end"])
            .exists()
            .custom((query) => {
                try {
                    if (typeof query.start !== "string" || typeof query.end !== "string") {
                        return false;
                    }
                    const startDate = new Date(query.start);
                    const endDate = new Date(query.end);
                    return startDate < endDate;
                } catch (error) {
                    logger.error(new ApiError(error, { source: checkRangeQuery.name, code: 406 }));
                    return false;
                }
            }),
    ];
}
