import { Request, Response } from "express";
import logger, { ApiError } from "../console/logger";

// INTERFACES
interface Range {
    start: string;
    end: string;
}
interface Month {
    [x: number]: Range;
}
interface Year {
    [x: number]: Month;
}
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
        const { start, end } = req.query;
        // check year range
        // build calendarChain(s) : calendar 2023 + calendar 2024
        const calendarChain: Year = {};
        for (const year of Array<number>(...new Set([getYear(String(start)), getYear(String(end))]))) {
            Object.assign(year, getGregorianCalendar(year));
        }
        // intersect absence and yearChain into result -> fun but how
        const absenceSplitByCalendar = intersectRange({ start: String(start), end: String(end) }, calendarChain);
        // apply timezone ??

        // output calendar object with date iso string mapping
        res.status(200).json(absenceSplitByCalendar);
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

// DATE
function getYear(date: string): number {
    console.log(date);
    return 2000;
}
function isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// FUNCTIONAL
function intersectRange(absence: Range, calendarChain: Year): Year {
    return {};
}

// CORE LOGIC
function formatMonthNumber(monthNumber: number): string {
    return monthNumber.toString().length === 1 ? `0${monthNumber}` : String(monthNumber);
}

function getGregorianCalendar(year: number): Month {
    return {
        1: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-31-01T23:59:59.999Z`,
        },
        2: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: isLeapYear(year) ? `${year}-29-01T23:59:59.999Z` : `${year}-28-01T23:59:59.999Z`,
        },
        3: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-31-01T23:59:59.999Z`,
        },
        4: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-30-01T23:59:59.999Z`,
        },
        5: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-31-01T23:59:59.999Z`,
        },
        6: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-30-01T23:59:59.999Z`,
        },
        7: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-31-01T23:59:59.999Z`,
        },
        8: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-31-01T23:59:59.999Z`,
        },
        9: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-30-01T23:59:59.999Z`,
        },
        10: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-31-01T23:59:59.999Z`,
        },
        11: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-30-01T23:59:59.999Z`,
        },
        12: {
            start: `${year}-01-01T00:00:00.000Z`,
            end: `${year}-31-01T23:59:59.999Z`,
        },
    };
}
