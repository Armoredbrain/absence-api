import { Request, Response } from "express";
import { getSplitAbsenceByMonth } from "../../controllers/absence";

describe("absence", () => {
    test("should NOT alter date if query are in UTC", async () => {
        const req: Partial<Request> = {
            query: {
                start: "2023-01-15T14:30:00.000Z",
                end: "2023-02-16T16:30:00.000Z",
            },
        };

        const res: Partial<Response> = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);

        await getSplitAbsenceByMonth(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith([
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
    test("should return date in UTC if timezone from query is not UTC", async () => {
        const req: Partial<Request> = {
            query: {
                start: "2023-01-15T14:30:00.000+07:00",
                end: "2023-02-16T16:30:00.000+07:00",
            },
        };

        const res: Partial<Response> = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);

        await getSplitAbsenceByMonth(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith([
            {
                start: new Date("2023-01-15T07:30:00.000Z"),
                end: new Date("2023-01-31T23:59:59.999Z"),
            },
            {
                start: new Date("2023-02-01T00:00:00.000Z"),
                end: new Date("2023-02-16T09:30:00.000Z"),
            },
        ]);
    });
});
