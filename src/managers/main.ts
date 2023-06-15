import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";

// INTERFACES
export interface Range {
    start: Date;
    end: Date;
}

// ENUMS
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

// DATE
export function getYearIndex(date: Date): number {
    return getYear(date);
}

function getMonthIndex(date: Date): number {
    return getMonth(date) + 1;
}

function isLeapYear(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
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

// CORE LOGIC
const START_OF_DAY = "00:00:00.000";
const END_OF_DAY = "23:59:59.999";
function formatMonthIndex(monthNumber: number): string {
    return monthNumber.toString().length === 1 ? `0${monthNumber}` : String(monthNumber);
}

function getMonthStart(month: Date): Date {
    return new Date(`${getYearIndex(month)}-${formatMonthIndex(getMonthIndex(month))}-01T${START_OF_DAY}Z`);
}

function getMonthEnd(month: Date): Date {
    const yearIndex = getYearIndex(month);
    const monthIndex = getMonthIndex(month);
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
