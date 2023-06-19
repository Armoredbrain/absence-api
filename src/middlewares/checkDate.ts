import { query, ValidationChain } from "express-validator";

export function checkRangeQuery(): ValidationChain[] {
    return [query(["start", "end"]).exists().isString().isISO8601()];
}
