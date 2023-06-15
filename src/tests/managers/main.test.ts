import { getGregorianCalendar, intersectRange, splitAbsenceByMonth } from "../../managers/main";

describe("intersectRange", () => {
    test("should return absence range splitted by month", () => {
        expect(
            intersectRange(
                {
                    start: new Date("2023-01-15T14:30:00.000Z"),
                    end: new Date("2023-02-16T16:30:00.000Z"),
                },
                { 2023: getGregorianCalendar(2023) }
            )
        ).toEqual({
            2023: {
                1: {
                    start: new Date("2023-01-15T14:30:00.000Z"),
                    end: new Date("2023-01-31T23:59:59.999Z"),
                },
                2: {
                    start: new Date("2023-02-01T00:00:00.000Z"),
                    end: new Date("2023-02-16T16:30:00.000Z"),
                },
            },
        });
    });
    // test("should return year span absence range splitted by month", () => {
    //     expect(
    //         intersectRange(
    //             {
    //                 start: new Date("2023-12-15T14:30:00.000Z"),
    //                 end: new Date("2024-01-15T16:30:00.000Z"),
    //             },
    //             { 2023: getGregorianCalendar(2023) }
    //         )
    //     ).toEqual({
    //         2023: {
    //             12: {
    //                 start: new Date("2023-12-15T14:30:00.000Z"),
    //                 end: new Date("2023-12-31T23:59:59.999Z"),
    //             },
    //         },
    //         2024: {
    //             1: {
    //                 start: new Date("2024-01-01T00:00:00.000Z"),
    //                 end: new Date("2024-01-15T16:30:00.000Z"),
    //             },
    //         },
    //     });
    // });
});

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
    test("should return absence range splitted by multiple month", () => {
        expect(
            splitAbsenceByMonth({
                start: new Date("2023-12-15T14:30:00.000Z"),
                end: new Date("2024-03-15T16:30:00.000Z"),
            })
        ).toEqual([
            {
                start: new Date("2023-12-15T14:30:00.000Z"),
                end: new Date("2023-12-31T23:59:59.999Z"),
            },
            {
                start: new Date("2024-01-01T00:00:00.000Z"),
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
});
