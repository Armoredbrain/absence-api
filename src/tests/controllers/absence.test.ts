import { Request, Response } from "express";
import { getSplitAbsenceByMonth } from "../../controllers/absence";
import * as mainManager from "../../managers/main";

describe("absence", () => {
    test("should handle range query and return split range by month", async () => {
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

        expect(res.status).toHaveBeenCalledWith(200);
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
    test("should handle range distant timezone query and return UTC", async () => {
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

        expect(res.status).toHaveBeenCalledWith(200);
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
    test("should fallback in catch if date interval error is encountered", async () => {
        const req: Partial<Request> = {
            query: {
                start: "2023-02-16T16:30:00.000Z",
                end: "2023-01-15T14:30:00.000Z",
            },
        };

        const res: Partial<Response> = {};

        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);

        const splitAbsenceByMonthSpy = jest.spyOn(mainManager, "splitAbsenceByMonth");
        const convertAbsenceRangeIntoUtcRangeSpy = jest.spyOn(mainManager, "convertAbsenceRangeIntoUtcRange");
        await getSplitAbsenceByMonth(req as Request, res as Response);

        expect(convertAbsenceRangeIntoUtcRangeSpy).toHaveBeenCalledWith({
            start: "2023-02-16T16:30:00.000Z",
            end: "2023-01-15T14:30:00.000Z",
        });
        expect(splitAbsenceByMonthSpy).toHaveBeenCalledWith({
            start: new Date("2023-02-16T16:30:00.000Z"),
            end: new Date("2023-01-15T14:30:00.000Z"),
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ code: 500, message: "Invalid interval" });
    });
});
