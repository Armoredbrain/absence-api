import { app } from "./server";
import logger from "./console/logger";
import http from "http";
import * as dotenv from "dotenv";
dotenv.config();

const { LOCAL_URL, LOCAL_PORT } = process.env;

(async () => {
    try {
        if (!LOCAL_URL || !LOCAL_PORT) {
            throw new Error("Missing environment variables");
        }
        http.createServer(app).listen(LOCAL_PORT, () => logger.info(`server running on port: ${LOCAL_PORT}`));
    } catch (error) {
        logger.error(error);
    }
})();
