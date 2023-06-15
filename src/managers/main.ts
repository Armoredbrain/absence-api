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
    JANUARY = 0,
    FEBRUARY = 1,
    MARCH = 2,
    APRIL = 3,
    MAY = 4,
    JUNE = 5,
    JULY = 6,
    AUGUST = 7,
    SEPTEMBER = 8,
    OCTOBER = 9,
    NOVEMBER = 10,
    DECEMBER = 11,
}

// DATE
export function getYearIndex(date: Date): number {
    return getYear(date);
}

function getMonthIndex(date: Date): number {
    return getMonth(date);
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
function formatMonthIndex(monthIndex: number): string {
    const userFriendlyMonthIndex = monthIndex + 1;
    return String(userFriendlyMonthIndex).length === 1 ? `0${userFriendlyMonthIndex}` : String(userFriendlyMonthIndex);
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
        monthIndex % 2 === 1 &&
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
