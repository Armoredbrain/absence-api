import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";

// INTERFACES
interface Range {
    start: Date;
    end: Date;
}

interface Month {
    [x: number]: Range;
}

export interface Year {
    [x: number]: Month;
}

// DATE
const START_OF_DAY = "00:00:00.000";
const END_OF_DAY = "23:59:59.999";

export function getYearIndex(date: Date): number {
    return getYear(date);
}

function getMonthIndex(date: Date): number {
    return getMonth(date) + 1;
}

function getMonthStart(month: Date): Date {
    return new Date(`${getYearIndex(month)}-${formatMonthIndex(getMonthIndex(month))}-01T${START_OF_DAY}Z`);
}

function getMonthEnd(month: Date): Date {
    const yearIndex = getYearIndex(month);
    const monthIndex = getMonthIndex(month);
    console.log(monthIndex);
    const formattedMonthIndex = formatMonthIndex(monthIndex);
    let end = `${yearIndex}-${formattedMonthIndex}-31T${END_OF_DAY}Z`;
    if (
        monthIndex % 2 === 0 &&
        monthIndex !== MonthIndex.AUGUST &&
        monthIndex !== MonthIndex.OCTOBER &&
        monthIndex !== MonthIndex.DECEMBER
    ) {
        end = `${yearIndex}-${formattedMonthIndex}-30T${END_OF_DAY}Z`;
    }
    if (monthIndex === MonthIndex.FEBRUARY) {
        end = `${yearIndex}-${formattedMonthIndex}-${isLeapYear(yearIndex) ? 29 : 28}T${END_OF_DAY}Z`;
    }
    return new Date(end);
}

function isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// FUNCTIONAL
export function intersectRange(absence: Range, _calendarChain: Year): Year {
    console.log("absence", absence);
    const months = eachMonthOfInterval(absence);
    console.log("MONTH INTERVAL ", months);
    const skeleton = { [getYearIndex(absence.start)]: {} };
    return months.reduce(
        (absenceSplitByMonthAndYear: Year, month: Date, index: number) => {
            const start = index === 0 ? absence.start : getMonthStart(month);
            const end = index === months.length - 1 ? absence.end : getMonthEnd(month);
            Object.assign(absenceSplitByMonthAndYear[getYearIndex(month)], {
                [getMonthIndex(month)]: { start, end },
            });
            return absenceSplitByMonthAndYear;
        },
        { [getYearIndex(absence.start)]: {} }
    );
    // get where absence.start is in calendar chain
    // get where absence.end is in calendar chain
    // return what is between
}

// FUNCTIONAL
export function splitAbsenceByMonth(absence: Range): Range[] {
    const months = eachMonthOfInterval(absence);
    return months.reduce((absenceSplitByMonth: Range[], month: Date, index: number) => {
        const start = index === 0 ? absence.start : getMonthStart(month);
        const end = index === months.length - 1 ? absence.end : getMonthEnd(month);
        absenceSplitByMonth.push({ start, end });
        return absenceSplitByMonth;
    }, []);
}

function searchCalendarChain(calendarChain: Year, year: number, month?: number): Month | Range {
    return month ? calendarChain[year][month] : calendarChain[year];
}

// CORE LOGIC
function formatMonthIndex(monthNumber: number): string {
    return monthNumber.toString().length === 1 ? `0${monthNumber}` : String(monthNumber);
}

enum MonthIndex {
    JANUARY = 1,
    FEBRUARY = 2,
    MARCH = 3,
    APRIL = 4,
    MAY = 5,
    JUNE = 6,
    JULY = 7,
    AUGUST = 8,
    SEPTEMBER = 9,
    OCTOBER = 10,
    NOVEMBER = 11,
    DECEMBER = 12,
}
export function getGregorianCalendar(year: number): Month {
    const monthSpan = Array.from({ length: MonthIndex.DECEMBER }, (_, i) => i + 1);
    return monthSpan.reduce((calendar: Month, monthIndex: number) => {
        const monthString = formatMonthIndex(monthIndex);
        let end = `${year}-${monthString}-31T${END_OF_DAY}Z`;
        if (monthIndex % 2 && monthIndex !== MonthIndex.AUGUST) {
            end = `${year}-${monthString}-30T${END_OF_DAY}Z`;
        }
        if (monthIndex === MonthIndex.FEBRUARY) {
            end = `${year}-${monthString}-${isLeapYear(year) ? 29 : 28}T${END_OF_DAY}Z`;
        }
        Object.assign(calendar, {
            [monthIndex]: {
                start: new Date(`${year}-${monthString}-01T${START_OF_DAY}Z`),
                end: new Date(end),
            },
        });
        return calendar;
    }, {});
}
