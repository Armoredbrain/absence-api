import express from "express";
import morganMiddleware from "./console/morganMiddleware";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import * as swaggerDoc from "./swagger/swagger.json";
import { absenceRouter } from "./routes/absenceRouter";

export const app = express();

dotenv.config();

app.use(helmet());
app.use(morganMiddleware);
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
const localUrl = new URL(process.env.LOCAL_URL ?? "");
let corsOrigin;
if (localUrl.hostname.split(".").length > 2) {
    corsOrigin = new RegExp(localUrl.hostname.slice(localUrl.hostname.indexOf(".") + 1) + "(:[0-9]{3,4}){0,1}");
}
app.use(cors({ origin: corsOrigin ?? true, credentials: true }));

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/absences", absenceRouter);
