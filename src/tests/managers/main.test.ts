import { splitAbsenceByMonth } from "../../managers/main";

describe("splitAbsenceByMonth", () => {
    test("should return absence range splitted by month", () => {
        expect(
            splitAbsenceByMonth({
                start: new Date("2023-01-15T14:30:00.000Z"),
                end: new Date("2023-02-16T16:30:00.000Z"),
            })
        ).toEqual([
            {
                start: new Date("2023-01-15T14:30:00.000Z"),
                end: new Date("2023-01-31T23:59:59.999Z"),
            },
            {
                start: new Date("2023-02-01T00:00:00.000Z"),
                end: new Date("2023-02-16T16:30:00.000Z"),
            },
        ]);
    });
    test("should return year span absence range splitted by month", () => {
        expect(
            splitAbsenceByMonth({
                start: new Date("2023-12-15T14:30:00.000Z"),
                end: new Date("2024-01-15T16:30:00.000Z"),
            })
        ).toEqual([
            {
                start: new Date("2023-12-15T14:30:00.000Z"),
                end: new Date("2023-12-31T23:59:59.999Z"),
            },
            {
                start: new Date("2024-01-01T00:00:00.000Z"),
                end: new Date("2024-01-15T16:30:00.000Z"),
            },
        ]);
    });
    test("should return absence range splitted by multiple month with a leap year", () => {
        expect(
            splitAbsenceByMonth({
                start: new Date("2024-01-15T14:30:00.000Z"),
                end: new Date("2024-03-15T16:30:00.000Z"),
            })
        ).toEqual([
            {
                start: new Date("2024-01-15T14:30:00.000Z"),
                end: new Date("2024-01-31T23:59:59.999Z"),
            },
            {
                start: new Date("2024-02-01T00:00:00.000Z"),
                end: new Date("2024-02-29T23:59:59.999Z"),
            },
            {
                start: new Date("2024-03-01T00:00:00.000Z"),
                end: new Date("2024-03-15T16:30:00.000Z"),
            },
        ]);
    });
    test("should return absence range splitted by multiple month without a leap year", () => {
        expect(
            splitAbsenceByMonth({
                start: new Date("2023-01-15T14:30:00.000Z"),
                end: new Date("2023-03-15T16:30:00.000Z"),
            })
        ).toEqual([
            {
                start: new Date("2023-01-15T14:30:00.000Z"),
                end: new Date("2023-01-31T23:59:59.999Z"),
            },
            {
                start: new Date("2023-02-01T00:00:00.000Z"),
                end: new Date("2023-02-28T23:59:59.999Z"),
            },
            {
                start: new Date("2023-03-01T00:00:00.000Z"),
                end: new Date("2023-03-15T16:30:00.000Z"),
            },
        ]);
    });
    test("should handle absence on the edge between days", () => {
        expect(
            splitAbsenceByMonth({
                start: new Date("2023-01-01T23:59:59.999Z"),
                end: new Date("2023-01-02T00:00:00.000Z"),
            })
        ).toEqual([
            {
                start: new Date("2023-01-01T23:59:59.999Z"),
                end: new Date("2023-01-02T00:00:00.000Z"),
            },
        ]);
    });
    test("should handle absence on the edge between days inverted", () => {
        expect(
            splitAbsenceByMonth({
                start: new Date("2023-01-01T00:00:00.000Z"),
                end: new Date("2023-01-02T23:59:59.999Z"),
            })
        ).toEqual([
            {
                start: new Date("2023-01-01T00:00:00.000Z"),
                end: new Date("2023-01-02T23:59:59.999Z"),
            },
        ]);
    });
});
