import express, { Request, Response } from "express";
import { checkRangeQuery } from "../../middlewares/checkDate";
import { validator } from "../../middlewares/validator";
import request from "supertest";

describe("checkRangeQuery", () => {
    const app = express();
    app.use(express.json());
    app.get("/", checkRangeQuery(), validator, (_req: Request, res: Response) => {
        res.status(200).end();
    });
    test("should let request pass", (done) => {
        request(app)
            .get("/")
            .query({
                start: "2023-01-15T14:30:00.000Z",
                end: "2023-02-16T16:30:00.000Z",
            })
            .expect(200, done);
    });
    test("should NOT let request pass", (done) => {
        request(app)
            .get("/")
            .query({
                start: true,
                end: false,
            })
            .expect(
                406,
                {
                    code: 406,
                    message: [
                        {
                            type: "field",
                            value: "true",
                            msg: "Invalid value",
                            path: "start",
                            location: "query",
                        },
                        {
                            type: "field",
                            value: "false",
                            msg: "Invalid value",
                            path: "end",
                            location: "query",
                        },
                    ],
                },
                done
            );
    });
});
